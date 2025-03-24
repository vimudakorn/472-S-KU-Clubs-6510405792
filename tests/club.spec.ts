import { test, expect } from '@playwright/test';
import path from "path";
import fs from "fs/promises";
import Club from "@/interfaces/Club";

const getClubs = async () => {
  try {
    const filePath = path.join(process.cwd(), "data/clubs.json");
    const fileData = await fs.readFile(filePath, "utf-8");

    if (!fileData) {
      throw new Error("ไม่พบไฟล์ .json ข้อมูลองค์กรนิสิต");
    }

    const clubs = JSON.parse(fileData) as Club[];

    return clubs;
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    throw new Error("เกิดข้อผิดพลาดในการค้นหาองค์กรนิสิต");
  }
};

test.describe('Club Page', () => {

  test.beforeEach(async ({ page }) => {
    // Mock API response for testing
    await page.route('/api/clubs*', async (route) => {
      const clubs = await getClubs();
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(clubs),
      });
    });

    await page.goto('/');
  });

  test('should display loading skeleton while fetching data', async ({ page }) => {
    // Ensure skeletons are visible during loading
    await expect(page.getByTestId('skeleton').first()).toBeVisible();
  });

  test('should hide skeleton and display content after data loads', async ({ page }) => {
    // Wait for the data to load and skeleton to disappear
    await expect(page.getByTestId('skeleton')).toHaveCount(0);

    // Ensure club content is displayed
    await expect(page.getByText('ชมรมดนตรีสากล')).toBeVisible();
  });

  test('should filter clubs based on search input', async ({ page }) => {
    // Input a search term
    await page.fill('input[type="search"]', 'ดนตรี');

    // Verify the filtered result
    await expect(page.getByText('ชมรมดนตรีสากล')).toBeVisible();
  });

  test('should display fallback message if no club is found', async ({ page }) => {
    // Input a search term that yields no results
    await page.fill('input[type="search"]', 'Non-existent Club');
    await page.waitForTimeout(2000);
    // Verify no results message appears
    await expect(page.getByText('ไม่พบชมรมที่ค้นหา')).toBeVisible();
  });

  test('should maintain loading state on navigation and return', async ({ page }) => {
    // Navigate to another page
    await page.goto('/club/1/activities');

    // Return to home page
    await page.goto('/');

    // Ensure skeleton is visible during re-fetching
    await expect(page.getByTestId('skeleton').first()).toBeVisible();
  });

  test('should display all clubs with name, and description', async ({ page }) => {
    await page.waitForTimeout(2000);
    await expect(page.getByText('ชมรมดนตรีสากล')).toBeVisible();
    // await expect(page.getByText('#ศิลปะและดนตรี')).toBeVisible();
    // await expect(page.getByText('#วิทยาเขตบางเขต')).toBeVisible();
  });

  test('should navigate to club detail page on click', async ({ page }) => {
    await page.click('text=Technology Club');
    await expect(page).toHaveURL('/clubs/1');

    await expect(page.getByText('Technology Club')).toBeVisible();
    await expect(page.getByText('A club focused on cutting-edge technology.')).toBeVisible();
    await expect(page.getByText('Activities')).toBeVisible();
    await expect(page.getByText('Contact Details')).toBeVisible();
    await expect(page.getByText('Social Media Links')).toBeVisible();
  });

  test('should support pagination and load more content', async ({ page }) => {
    await page.route('/api/clubs?page=2', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 3,
            clubName: 'Music Club',
            clubType: 'ศิลปะศาสตร์',
            campus: 'วิทยาเขตศรีราชา',
            description: 'A club for music lovers.',
            logo: '/logos/music-club.png',
          },
        ]),
      });
    });

    await page.locator('button:has-text("Load More")').click();
    await expect(page.getByText('Music Club')).toBeVisible();
  });
});
