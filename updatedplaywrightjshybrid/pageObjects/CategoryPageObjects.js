export class CategoryPageObjects {
  constructor(page) {
    this.page = page;
  }

  getCategoryLink(categoryName) {
    return this.page.locator(`a:has-text("${categoryName}")`);
  }

  getActiveCategoryLink(categoryName) {
    return this.page.locator(`a.active:has-text("${categoryName}")`);
  }
}

