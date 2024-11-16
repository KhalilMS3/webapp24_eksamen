import {
  test,
  expect,
  type Page,
  type Locator,
  type BrowserContext,
} from "@playwright/test";

let page: Page;
let context: BrowserContext;

test.describe("Oppgave 1 Create", () => {
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("/courseForm");
  });
  

  test.describe("When showing create page", () => {
    test("Should have test-id steps", async () => {
      // we should wait for the selector before checking if it is "available/visible"
      await page.waitForSelector('[data-testid="steps"]')
      const stepsLocator = await page.locator('[data-testid="steps"]')
      await expect(stepsLocator).toBeVisible({ timeout: 10000 })
    });
    test("Should have test-id form_submit", async () => {
      await page.waitForSelector('[data-testid="form_submit"]')
      const submitLocator = await page.locator('[data-testid="form_submit"]')
      await expect(submitLocator).toBeVisible({ timeout: 10000 })
    });
    test("Should have test-id title", async () => {
      await page.waitForSelector('[data-testid="title"]')
      const titleLocator = await page.locator('[data-testid="title"]');
      await expect(titleLocator).toBeVisible({ timeout: 10000 });
    });
    test("Should have test-id form", async () => {
      await page.waitForSelector('[data-testid="form"]')
      const formLocator = await page.locator('[data-testid="form"]');
      await expect(formLocator).toBeVisible({ timeout: 10000 });
    });
    test("Should have test-id course_step", async () => {
      await page.waitForSelector('[data-testid="course_step"]')
      const courseStepLocator = await page.locator('[data-testid="course_step"]');
      await expect(courseStepLocator).toBeVisible({ timeout: 10000 });
    });
    test("Should have test-id form_title", async () => {
      await page.waitForSelector('[data-testid="form_title"]')
      const formTitleLocator = await page.locator('[data-testid="form_title"]');
      await expect(formTitleLocator).toBeVisible({ timeout: 10000 });
    });
    test("Should have test-id form_slug", async () => {
      await page.waitForSelector('[data-testid="form_slug"]')
      const formSlugLocator = await page.locator('[data-testid="form_slug"]');
      await expect(formSlugLocator).toBeVisible({ timeout: 10000 });
    });
    test("Should have test-id form_description", async () => {
      await page.waitForSelector('[data-testid="form_description"]')
      const formDescriptionLocator = await page.locator('[data-testid="form_description"]');
      await expect(formDescriptionLocator).toBeVisible({ timeout: 10000 });
    });
    test("Should have test-id form_category", async () => {
      await page.waitForSelector('[data-testid="form_category"]')
      const formCategoryLocator = await page.locator('[data-testid="form_category"]');
      await expect(formCategoryLocator).toBeVisible({ timeout: 10000 });
    });
  });
})

/*
  test.describe("When stepping from first to second step", () => {
    test("Should show error if any required field are missing", async () => {});
    test("Should show error if title field is missing", async () => {});
    test("Should show error if slug field is missing", async () => {});
    test("Should show error if description field is missing", async () => {});
    test("Should show error if category field is missing", async () => {});
    test("Should not show error if all fields are provided", async () => {});
});

  test.describe("When at step two", () => {
    test("Should have disabled submit btn", async () => {});
    test("Should have no errors", async () => {});
    test("Should have no success", async () => {});
    test("Should have test-id lessons", async () => {});
    test("Should have test-id form_lesson_add", async () => {});
    test("Should have test-id form_lesson_add", async () => {});
  });
  test.describe("When added new lesson", () => {
    test("Should have disabled submit btn", async () => {});
    test("Should have no errors", async () => {});
    test("Should have no success", async () => {});
    test("Should have test-id lessons", async () => {});
    test("Should have test-id form_lesson_add", async () => {});
    test("Should have test-id form_lesson_add_text", async () => {});
    test("Should have test-id form_lesson_title", async () => {});
    test("Should have test-id form_lesson_slug", async () => {});
    test("Should have test-id form_lesson_preAmble", async () => {});
    test("Should have test-id form_lesson_add_text", async () => {});
    test("Should have one lesson", async () => {});
  });
  test.describe("When creating multiple lessons", () => {
    test("Should have disabled submit btn if title is missing", async () => {});
    test("Should have disabled submit btn if preAmble is missing", async () => {});
    test("Should have disabled submit btn if slug is missing", async () => {});
    test("Should have disabled submit btn if text is missing", async () => {});
    test("Should have disabled submit btn if all fields are added on last lesson", async () => {});
    test("Should have enabled submit btn if all fields are added on all lesson", async () => {});
    test("Should disable publish button if new lesson is added", async () => {});
  });
  test.describe("When creating multiple lessons with multiple textboxes", () => {
    test("Should have enabled publish button if all text fields are valid", async () => {});
  });
  test.describe("When created new course", () => {
    test("Should have show success when submitted", async () => {});
    test("Should show preview of content when submitted", async () => {});
    test("Should get response 200 from server", async () => {});
    test("Should get correct data from server", async () => {});
  });
}); */
