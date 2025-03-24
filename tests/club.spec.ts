// import { test, expect } from "@playwright/test";

// test.describe("Club Page", () => {
//   // Increase timeout for navigation
//   test.setTimeout(6000);

//   test.beforeEach(async ({ page }) => {
//     try {
//       await page.goto("/", { timeout: 4000 });

//       await page.waitForSelector("text=KU Clubs", { timeout: 4000 });
//     } catch (error) {
//       console.error("Navigation failed:", error);

//       await page.screenshot({ path: "navigation-error.png" });
//       throw error;
//     }
//   });


// });


// playwright-test/home.spec.tsx
import { test, expect } from '@playwright/test';

test('Display Loading Skeleton', async ({ page }) => {
  await page.goto('/');

  // Check if skeleton elements are visible
  await expect(page.locator('text=KU Clubs').locator('..').locator('div').first()).toHaveText('Loading...', {
    ignoreCase: true,
  });
  await expect(page.locator('text=ประเภทชมรม').locator('..').locator('div').first()).toHaveText('Loading...', {
    ignoreCase: true,
  });
  await expect(page.locator('text=วิทยาเขต').locator('..').locator('div').first()).toHaveText('Loading...', {
    ignoreCase: true,
  });
  // Check for ClubBoxSkeleton elements
  await expect(page.locator('text=Loading...').nth(3)).toBeVisible();
});

test('Hide Skeleton on Data Load', async ({ page }) => {
  await page.goto('/');

  // Wait for the loading to finish (adjust timeout if needed)
  await page.waitForTimeout(2500); // 2000ms + buffer

  // Check if skeleton elements are hidden
  await expect(page.locator('text=KU Clubs').locator('..').locator('div').first()).not.toHaveText('Loading...', {
    ignoreCase: true,
  });
  await expect(page.locator('text=ประเภทชมรม').locator('..').locator('div').first()).not.toHaveText('Loading...', {
    ignoreCase: true,
  });
  await expect(page.locator('text=วิทยาเขต').locator('..').locator('div').first()).not.toHaveText('Loading...', {
    ignoreCase: true,
  });
  // Check for ClubBoxSkeleton elements are hidden
  await expect(page.locator('text=Loading...').nth(3)).not.toBeVisible();

  // Check if actual content is displayed
  await expect(page.locator('text=ชมรมพัฒนาซอฟต์แวร์')).toBeVisible();
});

test('Consistent User Experience - Navigation and Loading', async ({ page }) => {
  await page.goto('/');

  // Navigate to a different page (simulate navigation)
  await page.evaluate(() => {
    window.history.pushState({}, 'New Page', '/new-page');
  });

  // Navigate back
  await page.goBack();

  // Check if skeleton elements are visible again
  await expect(page.locator('text=KU Clubs').locator('..').locator('div').first()).toHaveText('Loading...', {
    ignoreCase: true,
  });
  await expect(page.locator('text=ประเภทชมรม').locator('..').locator('div').first()).toHaveText('Loading...', {
    ignoreCase: true,
  });
  await expect(page.locator('text=วิทยาเขต').locator('..').locator('div').first()).toHaveText('Loading...', {
    ignoreCase: true,
  });
  await expect(page.locator('text=Loading...').nth(3)).toBeVisible();

  // Wait for loading to finish and check content
  await page.waitForTimeout(2500);
  await expect(page.locator('text=ชมรมดนตรีสากล')).toBeVisible();
  await expect(page.locator('text=KU Clubs').locator('..').locator('div').first()).not.toHaveText('Loading...', {
    ignoreCase: true,
  });
  await expect(page.locator('text=ประเภทชมรม').locator('..').locator('div').first()).not.toHaveText('Loading...', {
    ignoreCase: true,
  });
  await expect(page.locator('text=วิทยาเขต').locator('..').locator('div').first()).not.toHaveText('Loading...', {
    ignoreCase: true,
  });
  await expect(page.locator('text=Loading...').nth(3)).not.toBeVisible();
});

test('Search functionality', async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(2500);

  await page.locator('input[type="search"]').fill('ดนตรี');
  await expect(page.locator('text=ชมรมดนตรีสากล')).toBeVisible();
  await expect(page.locator('text=ชมรมวิทยาศาสตร์สิ่งแวดล้อม')).not.toBeVisible();
});

test('Filter by Club Type', async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(2500);

  await page.locator('text=ประเภทชมรม').click();
  await page.locator('text=เทคโนโลยี').click();
  await expect(page.locator('text=ชมรมพัฒนาซอฟต์แวร์')).toBeVisible();
  await expect(page.locator('text=ชมรมวิทยาศาสตร์สิ่งแวดล้อม')).not.toBeVisible();
});

test('Filter by Campus', async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(2500);

  await page.locator('text=วิทยาเขต').click();
  await page.locator('text=บางเขน').click();
  await expect(page.locator('text=ชมรมพัฒนาซอฟต์แวร์')).toHaveText(/วิทยาเขตบางเขน/);
  await page.locator('text=วิทยาเขต').click();
  await page.locator('text=ศรีราชา').click();
  await expect(page.locator('text=ชมรมพัฒนาซอฟต์แวร์')).not.toBeVisible();

});

test('No Clubs Found', async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(2500);

  await page.locator('input[type="search"]').fill('Nonexistent Club');
  await expect(page.locator('text=ไม่พบชมรมที่ค้นหา')).toBeVisible();
});