export class CategoryPageObjects {
  constructor(page) {
    this.page = page;
    this.phonesCategory = page.getByRole('link', { name: 'Phones' });
    this.laptopsCategory = page.getByRole('link', { name: 'Laptops' });
    this.monitorsCategory = page.getByRole('link', { name: 'Monitors' });
    this.productListingArea = page.locator('.product-listing, #products, [data-product-list]');
    this.productItems = page.locator('.product-item, .product, [data-product]');
  }

  getProductByName(productName) {
    return this.page.locator(`.product-item:has-text("${productName}"), .product:has-text("${productName}")`);
  }

  getCategoryLink(categoryName) {
    return this.page.getByRole('link', { name: categoryName });
  }
}