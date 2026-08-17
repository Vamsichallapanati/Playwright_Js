package pageObjects;

import org.openqa.selenium.By;

public class CategoryHighlightPageObjects {

    // Navigation
    public static final By HOME_PAGE_LOGO = By.cssSelector("#nava"); // UNVERIFIED - needs selector evidence

    // Category links
    public static final By PHONES_CATEGORY = By.xpath("//a[contains(text(),'Phones')]"); // UNVERIFIED - needs selector evidence
    public static final By LAPTOPS_CATEGORY = By.xpath("//a[contains(text(),'Laptops')]"); // UNVERIFIED - needs selector evidence
    public static final By MONITORS_CATEGORY = By.xpath("//a[contains(text(),'Monitors')]"); // UNVERIFIED - needs selector evidence

    // Category state indicators
    public static final By ACTIVE_CATEGORY = By.cssSelector(".list-group-item.active"); // UNVERIFIED - needs selector evidence
}