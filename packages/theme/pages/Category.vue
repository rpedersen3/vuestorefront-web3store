<template>
  <div id="category">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <FacetNavbar :facetsList="result" />

    <div class="main section">
      <div class="sidebar desktop-only">
        <div style="height: 100px">
          <SfLoader :class="{ loading }" :loading="loading">
            <SfList>
              <SfListItem v-for="product in products" :key="product">
                <SfMenuItem :label="product.name" 
                  @click="selectProduct(product)">
                </SfMenuItem>
              </SfListItem>
            </SfList>
          </SfLoader>
        </div>
        <div>
          <SfLoader :class="{ loading }" :loading="loading">
            <SfAccordion
              :multiple="true"
              :open="currentCategoryNameForAccordion"
              showChevron
              transition="sf-expand"
            >
              <SfAccordionItem
                v-for="(cat, i) in categoryTree.items"
                :key="i"
                :header="cat.label"
              >
                <template>
                  <SfList class="list">
                    <SfListItem
                      class="list__item"
                      v-for="(subCat, j) in cat.items"
                      :key="j"
                    >
                      <SfMenuItem
                        :count="subCat.count || ''"
                        :data-cy="`category-link_subcategory_${subCat.slug}`"
                        :label="subCat.label"
                      >
                        <template #label="{ label }">
                          <nuxt-link
                            :to="localePath(th.getCatLink(subCat))"
                            :class="
                              subCat.isCurrent ? 'sidebar--cat-selected' : ''
                            "
                          >
                            {{ label }}
                          </nuxt-link>
                        </template>
                      </SfMenuItem>
                    </SfListItem>
                  </SfList>
                </template>
              </SfAccordionItem>
            </SfAccordion>
          </SfLoader>
        </div>
        
      </div>
      <SfLoader :class="{ loading }" :loading="loading">
        <div class="products" v-if="showProductAssets">
          <transition-group
            v-if="isCategoryGridView"
            appear
            name="products__slide"
            tag="div"
            class="products__grid"
          >
            <SfProductCard
              data-cy="category-product-card"
              v-for="(productAsset, i) in showProductAssets"
              :key="productAsset.id"
              :style="{ '--index': i }"
              :imageWidth="216"
              :imageHeight="288"
              :title="productAssetGetters.getName(productAsset)"
              :image="
                $image(
                  productAssetGetters.getCoverImage(productAsset),
                  216,
                  288,
                  productAssetGetters.getImageFilename(productAsset)
                )
              "
              :nuxtImgConfig="{ fit: 'cover' }"
              image-tag="nuxt-img"
              :regular-price="
                $n(productAssetGetters.getPrice(productAsset).regular, 'currency')
              "
              :special-price="
                productAssetGetters.getPrice(productAsset).regular !==
                productAssetGetters.getPrice(productAsset).special
                  ? productAssetGetters.getPrice(productAsset).special &&
                    $n(productAssetGetters.getPrice(productAsset).special, 'currency')
                  : ''
              "
              :max-rating="5"
              :score-rating="productAssetGetters.getAverageRating(productAsset)"
              :show-add-to-cart-button="true"
              :isInWishlist="isInWishlist({ productAsset })"
              :isAddedToCart="isInCart({ productAsset })"
              :link="localePath(productAssetGetters.getSlug(productAsset))"
              class="products__product-card"
              @click:wishlist="
                isInWishlist({ productAsset })
                  ? removeItemFromWishList({ productAsset: { productAsset } })
                  : addItemToWishlist({ productAsset })
              "
              @click:add-to-cart="
                addItemToCart({ productAsset, quantity: 1 }), toggleCartSidebar()
              "
            />
          </transition-group>
          <transition-group
            v-else
            appear
            name="products__slide"
            tag="div"
            class="products__list"
          >
            <SfProductCardHorizontal
              v-e2e="'category-product-card'"
              v-for="(productAsset, i) in showProductAssets"
              :key="productAsset.id"
              :style="{ '--index': i }"
              :imageWidth="140"
              :imageHeight="200"
              :nuxtImgConfig="{ fit: 'cover', alt: '123' }"
              image-tag="nuxt-img"
              :title="productAssetGetters.getName(productAsset)"
              :description="productAssetGetters.getDescription(productAsset)"
              :image="
                $image(
                  productAssetGetters.getCoverImage(productAsset),
                  140,
                  200,
                  productAssetGetters.getImageFilename(productAsset)
                )
              "
              :regular-price="
                $n(productAssetGetters.getPrice(productAsset).regular, 'currency')
              "
              :special-price="
                productAssetGetters.getPrice(productAsset).regular !==
                productAssetGetters.getPrice(productAsset).special
                  ? productAssetGetters.getPrice(productAsset).special &&
                    $n(productAssetGetters.getPrice(productAsset).special, 'currency')
                  : ''
              "
              :isInWishlist="isInWishlist({ productAsset })"
              class="products__product-card-horizontal"
              @click:wishlist="addItemToWishlist({ product })"
              @click:add-to-cart="
                addItemToCart({ product, quantity: showProductAssets[i].qty || 1 }),
                  toggleCartSidebar()
              "
              v-model="showProductAssets[i].qty"
              :link="localePath(productAssetGetters.getSlug(productAsset))"
            >
              <template #actions>
                <SfButton
                  class="sf-button--text desktop-only"
                  style="margin: 0 0 1rem auto; display: block"
                  @click="addItemToWishlist({ product })"
                >
                  {{ $t('Save for later') }}
                </SfButton>
              </template>
            </SfProductCardHorizontal>
          </transition-group>

          <LazyHydrate on-interaction>
            <SfPagination
              v-if="!loading"
              data-cy="category-pagination"
              class="products__pagination"
              v-show="pagination.totalPages > 1"
              :current="pagination.currentPage"
              :total="pagination.totalPages"
              :visible="5"
            />
          </LazyHydrate>

          <div
            v-show="pagination.totalPages > 1"
            class="products__show-on-page"
          >
            <span class="products__show-on-page__label">{{
              $t('Show on page')
            }}</span>

            <SfSelect
              :value="pagination.itemsPerPage.toString()"
              class="products__items-per-page"
              @input="th.changeItemsPerPage"
            >
              <SfSelectOption
                v-for="option in pagination.pageOptions"
                :key="option"
                :value="option"
                class="products__items-per-page__option"
              >
                {{ option }}
              </SfSelectOption>
            </SfSelect>
          </div>
        </div>
        <div v-else key="no-results" class="before-results">
          <SfImage
            :width="256"
            :height="176"
            src="/error/error.svg"
            class="before-results__picture"
            alt="error"
            loading="lazy"
          />
          <p class="before-results__paragraph">
            {{ $t('Sorry, we didnt find what youre looking for') }}
          </p>
          <SfButton
            class="before-results__button color-secondary smartphone-only"
            @click="$emit('close')"
          >
            {{ $t('Go back') }}
          </SfButton>
        </div>
      </SfLoader>
    </div>

    <LazyHydrate when-idle>
      <FacetFilterSideBar :facetsList="result" />
    </LazyHydrate>
  </div>
</template>

<script >
import {
  SfButton,
  SfList,
  SfMenuItem,
  SfProductCard,
  SfHeading,
  SfProductCardHorizontal,
  SfPagination,
  SfAccordion,
  SfCheckbox,
  SfSelect,
  SfProperty,
  SfBreadcrumbs,
  SfLoader,
  SfImage
} from '@storefront-ui/vue';
import {
  ref,
  computed,
  onMounted,
  defineComponent,
  useRoute
} from '@nuxtjs/composition-api';
import {
  useCart,
  useWishlist,
  productGetters,
  useFacet,
  useProduct,
  productAssetGetters,
  facetGetters
} from '@vue-storefront/web3store';


import { useCache, CacheTagPrefix } from '@vue-storefront/cache';
import { useUiHelpers, useUiState } from '~/composables';
import { onSSR } from '@vue-storefront/core';
import LazyHydrate from 'vue-lazy-hydration';

export default defineComponent({
  name: 'Category',
  transition: 'fade',
  setup(props, { root }) {
    const th = useUiHelpers();
    const generic = ref('');
    const selectedFilters = ref([]);

    const { addTags } = useCache();
    const uiState = useUiState();
    const { addItem: addItemToCart, isInCart } = useCart();
    const {
      addItem: addItemToWishlist,
      removeItem: removeItemFromWishList,
      isInWishlist
    } = useWishlist();
    const { result, search, loading } = useFacet();
    const goToProduct = (product) => {
      var slug = productGetters.getSlug(product);
      console.info('(Rich) go to product slug: ' + slug)
      return slug;
    };
    const goToProductVariants = (product) => {
      const slug = productGetters.getProductVariantsSlug(product);
      console.info('(Rich) go to product variant slug: ' + slug)
      return slug;
    };
    const goToProductAssets = (productAsset) => {
      const slug = productAssetGetters.getProductAssetsSlug(productAsset);
      console.info('(Rich) go to product assets slug: ' + slug)
      return slug;
    };
    const route = useRoute();
    const { params, query } = route.value;

    const products = computed(() => {
      const ps = facetGetters.getProducts(result.value);
      console.info('(Rich) category get all products ********* :' + ps)
      return ps;
    });
    const showProductVariants = computed(() => {
      const ps = facetGetters.getFilteredProductVariants(result.value);
      console.info('(Rich) category get filtered variants ********* :' + ps)
      return ps;
    });
    const showProductAssets = computed(() => {
      const ps = facetGetters.getFilteredProductAssets(result.value);
      return ps;
    });
    const categoryTree = computed(() => {
      const categoryTree = facetGetters.getCategoryTree(result.value)
      console.info("(Rich) ^^^^^^^^^^  Category Tree: " + JSON.stringify(categoryTree));
      return categoryTree;
    });
      


    const pagination = computed(() => facetGetters.getPagination(result.value));
    //const showProducts = computed(
    //  () => !loading.value && products.value?.length > 0
    //);

    const currentCategory = computed(() => {
      return result.value?.data?.category || [];
    });

    const currentCategoryNameForAccordion = computed(() => {
      const name =
        currentCategory.value?.parent?.name ||
        categoryTree.value?.items[0]?.label ||
        '';
      return name;
    });

    const currentRootCategory = computed(() => {
      const category = result.value?.data?.category;

      const categoryFromParent = currentCategory.value?.parent?.parent;

      return category || categoryFromParent || {};
    });

    const breadcrumbs = computed(() => {
      const breadcrumbs = facetGetters.getBreadcrumbs({
        input: {
          params,
          currentRootCategory: currentRootCategory.value
        }
      });
      console.info("(Rich) ------------ current category: " + JSON.stringify(currentRootCategory.value))
      
      if (breadcrumbs.length > 0 && breadcrumbs[0].text === 'Home')
        breadcrumbs[0].text = root.$t('Home');
      return breadcrumbs;
    });

    const selectProduct = (product) => {
      console.info("(Rich) start select product ")
      const selectedValue = selectedFilters.value.find(
        (item) => item?.filterName === 'product'
      );

      if (selectedValue) {
        console.info("(Rich) select product needs to be updated")
      }
      else {
        console.info("(Rich) add filter")
        selectedFilters.value.push({
          label: 'product',
          filterName: 'product',
          id: product.id
        });
      }

      th.changeFilters(selectedFilters.value);
    };

    onSSR(async () => {
      const params = {
        pageSize: query.itemsPerPage || 12,
        ...th.getFacetsFromURL()
      };

      await search(params);

      addTags([
        {
          prefix: CacheTagPrefix.Category,
          value: currentRootCategory.value.id || params.slug_2
        }
      ]);
    });

    onMounted(() => {
      selectedFilters.value = th.facetsFromUrlToFilter();
      root.$scrollTo(root.$el, 2000);
    });

    return {
      ...uiState,
      goToProduct,
      goToProductVariants,
      goToProductAssets,
      currentRootCategory,
      currentCategory,
      th,
      generic,
      products,
      categoryTree,
      loading,
      selectedFilters,
      productGetters,
      productAssetGetters,
      pagination,
      breadcrumbs,
      addItemToWishlist,
      removeItemFromWishList,
      addItemToCart,
      isInWishlist,
      isInCart,
      showProductVariants,
      showProductAssets,
      selectProduct,
      result,
      currentCategoryNameForAccordion
    };
  },
  components: {
    SfSelect,
    SfProperty,
    SfButton,
    SfList,
    SfProductCard,
    SfProductCardHorizontal,
    SfPagination,
    SfMenuItem,
    SfHeading,
    SfAccordion,
    SfBreadcrumbs,
    SfCheckbox,
    SfLoader,
    LazyHydrate,
    SfImage
  },
  head: {
    script: [
      {
        type: 'application/ld+json',
        json: {
          '@context': 'https://schema.org',
          '@type': 'Category',
          name: 'Category Page'
        }
      }
    ]
  }
});
</script>

<style lang="scss" scoped>
@import '~/assets/css/category.scss';
</style>
