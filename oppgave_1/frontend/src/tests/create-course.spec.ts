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
  test.beforeAll(async ({browserName, browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("/courseForm");
  });
  /*
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

 test.describe("When stepping from first to second step", () => {
test("Should show error if any required field is missing", async () => {
    // Vent på at alle form-elementene er tilgjengelige
    const formTitle = page.locator('[data-testid="form_title"]');
    const formSlug = page.locator('[data-testid="form_slug"]');
    const formDescription = page.locator('[data-testid="form_description"]');
    const formCategory = page.locator('[data-testid="form_category"]');
    const formSubmit = page.locator('[data-testid="form_submit"]');
    const formError = page.locator('[data-testid="form_error"]');

    await expect(formTitle).toBeVisible();
    await expect(formSlug).toBeVisible();
    await expect(formDescription).toBeVisible();
    await expect(formCategory).toBeVisible();
    await expect(formSubmit).toBeVisible();

    // Fyll ut alle feltene med tomme verdier
    await formTitle.fill("");
    await formSlug.fill("");
    await formDescription.fill("");
     // Vent på at `form_category` inneholder `option`-elementer
    await formCategory.waitFor();
    await formCategory.selectOption({ index: 0 });

  // Klikk på knappen som går til steget "Leksjoner"
    const lessonsButton = page.locator('button', { hasText: 'Leksjoner' });
    await expect(lessonsButton).toBeVisible();
    await lessonsButton.click();
  
    await page.waitForTimeout(500)
    // Sjekk om feilmeldingen vises
    await expect(formError).toBeVisible({ timeout: 10000 });
  });
  test("Should show error if title field is missing", async () => {
    // Vent på at alle form-elementene er tilgjengelige
    const formTitle = page.locator('[data-testid="form_title"]');
    const formSlug = page.locator('[data-testid="form_slug"]');
    const formDescription = page.locator('[data-testid="form_description"]');
    const formCategory = page.locator('[data-testid="form_category"]');
    const formSubmit = page.locator('[data-testid="form_submit"]');
    const formError = page.locator('[data-testid="form_error"]');

    await expect(formTitle).toBeVisible();
    await expect(formSlug).toBeVisible();
    await expect(formDescription).toBeVisible();
    await expect(formCategory).toBeVisible();
    await expect(formSubmit).toBeVisible();

    // Fyll ut alle feltene med verdier untatt tittel
    await formTitle.fill("");
    await formSlug.fill("slug");
    await formDescription.fill("description");
     // Vent på at `form_category` inneholder `option`-elementer
    await formCategory.waitFor();
    await formCategory.selectOption({ index: 1 });

  // Klikk på knappen som går til steget "Leksjoner"
    const lessonsButton = page.locator('button', { hasText: 'Leksjoner' });
    await expect(lessonsButton).toBeVisible();
    await lessonsButton.click();
  
    await page.waitForTimeout(500)
    // Sjekk om feilmeldingen vises
    await expect(formError).toBeVisible({ timeout: 10000 });
  });

  test("Should show error if slug field is missing", async () => {
    // Vent på at alle form-elementene er tilgjengelige
    const formTitle = page.locator('[data-testid="form_title"]');
    const formSlug = page.locator('[data-testid="form_slug"]');
    const formDescription = page.locator('[data-testid="form_description"]');
    const formCategory = page.locator('[data-testid="form_category"]');
    const formSubmit = page.locator('[data-testid="form_submit"]');
    const formError = page.locator('[data-testid="form_error"]');

    await expect(formTitle).toBeVisible();
    await expect(formSlug).toBeVisible();
    await expect(formDescription).toBeVisible();
    await expect(formCategory).toBeVisible();
    await expect(formSubmit).toBeVisible();

    // Fyll ut alle feltene med verdier untatt slug
    await formTitle.fill("title");
    await formSlug.fill("");
    await formDescription.fill("description");
     // Vent på at `form_category` inneholder `option`-elementer
    await formCategory.waitFor();
    await formCategory.selectOption({ index: 1 });

  // Klikk på knappen som går til steget "Leksjoner"
    const lessonsButton = page.locator('button', { hasText: 'Leksjoner' });
    await expect(lessonsButton).toBeVisible();
    await lessonsButton.click();
  
    await page.waitForTimeout(500)
    // Sjekk om feilmeldingen vises
    await expect(formError).toBeVisible({ timeout: 10000 });
  });

   test("Should show error if description field is missing", async () => {
    // Vent på at alle form-elementene er tilgjengelige
    const formTitle = page.locator('[data-testid="form_title"]');
    const formSlug = page.locator('[data-testid="form_slug"]');
    const formDescription = page.locator('[data-testid="form_description"]');
    const formCategory = page.locator('[data-testid="form_category"]');
    const formSubmit = page.locator('[data-testid="form_submit"]');
    const formError = page.locator('[data-testid="form_error"]');

    await expect(formTitle).toBeVisible();
    await expect(formSlug).toBeVisible();
    await expect(formDescription).toBeVisible();
    await expect(formCategory).toBeVisible();
    await expect(formSubmit).toBeVisible();

    // Fyll ut alle feltene med verdier untatt description
    await formTitle.fill("title");
    await formSlug.fill("slug");
    await formDescription.fill("");
     // Vent på at `form_category` inneholder `option`-elementer
    await formCategory.waitFor();
    await formCategory.selectOption({ index: 1 });

  // Klikk på knappen som går til steget "Leksjoner"
    const lessonsButton = page.locator('button', { hasText: 'Leksjoner' });
    await expect(lessonsButton).toBeVisible();
    await lessonsButton.click();
  
    await page.waitForTimeout(500)
    // Sjekk om feilmeldingen vises
    await expect(formError).toBeVisible({ timeout: 10000 });

  });

  test("Should show error if category field is missing", async () => {
    // Vent på at alle form-elementene er tilgjengelige
    const formTitle = page.locator('[data-testid="form_title"]');
    const formSlug = page.locator('[data-testid="form_slug"]');
    const formDescription = page.locator('[data-testid="form_description"]');
    const formCategory = page.locator('[data-testid="form_category"]');
    const formSubmit = page.locator('[data-testid="form_submit"]');
    const formError = page.locator('[data-testid="form_error"]');

    await expect(formTitle).toBeVisible();
    await expect(formSlug).toBeVisible();
    await expect(formDescription).toBeVisible();
    await expect(formCategory).toBeVisible();
    await expect(formSubmit).toBeVisible();

    // Fyll ut alle feltene med verdier
    await formTitle.fill("title");
    await formSlug.fill("slug");
    await formDescription.fill("description");
     // Vent på at `form_category` inneholder `option`-elementer
    await formCategory.waitFor();
    await formCategory.selectOption({ index: 0 });

  // Klikk på knappen som går til steget "Leksjoner"
    const lessonsButton = page.locator('button', { hasText: 'Leksjoner' });
    await expect(lessonsButton).toBeVisible();
    await lessonsButton.click();
  
    await page.waitForTimeout(500)
    // Sjekk om feilmeldingen vises
    await expect(formError).toBeVisible({ timeout: 10000 });
  });

  test("Should not show error if all fields are provided", async () => {
        // Vent på at alle form-elementene er tilgjengelige
    const formTitle = page.locator('[data-testid="form_title"]');
    const formSlug = page.locator('[data-testid="form_slug"]');
    const formDescription = page.locator('[data-testid="form_description"]');
    const formCategory = page.locator('[data-testid="form_category"]');
    const formSubmit = page.locator('[data-testid="form_submit"]');
    const formError = page.locator('[data-testid="form_error"]');

    await expect(formTitle).toBeVisible();
    await expect(formSlug).toBeVisible();
    await expect(formDescription).toBeVisible();
    await expect(formCategory).toBeVisible();
    await expect(formSubmit).toBeVisible();

    // Fyll ut alle feltene med verdier
    await formTitle.fill("title");
    await formSlug.fill("slug");
    await formDescription.fill("description");
     // Vent på at `form_category` inneholder `option`-elementer
    await formCategory.waitFor();
    await formCategory.selectOption({ index: 1 });

  // Klikk på knappen som går til steget "Leksjoner"
    const lessonsButton = page.locator('button', { hasText: 'Leksjoner' });
    await expect(lessonsButton).toBeVisible();
    await lessonsButton.click();
  
    await page.waitForTimeout(500)
    // Sjekk om feilmeldingen vises
    await expect(formError).not.toBeVisible({ timeout: 10000 });
  });
  
  
  

  test.describe("When at step two", () => {
    test("Should have disabled submit btn", async () => {
    const formSubmit = page.locator('[data-testid="form_submit"]')
    
    await expect(formSubmit).toBeVisible({timeout: 10000})
    await expect(formSubmit).toBeDisabled
    });
  test("Should have no errors", async () => {
    const formError = page.locator('[data-testid="form_error"]')
    await expect(formError).not.toBeVisible({timeout: 10000})
    });
  test("Should have no success", async () => {
      const formSuccess = page.locator('[data-testid="form_success"]')
    await expect(formSuccess).not.toBeVisible({timeout: 10000})
    });
  test("Should have test-id lessons", async () => {
    const lessons = page.locator('[data-testid="lessons"]')
    await expect(lessons).toHaveCount(0, { timeout: 10000 });

    });
  test("Should have test-id form_lesson_add", async () => {
    const formTitle = page.locator('[data-testid="form_title"]');
    const formSlug = page.locator('[data-testid="form_slug"]');
    const formDescription = page.locator('[data-testid="form_description"]');
    const formCategory = page.locator('[data-testid="form_category"]');
    const formSubmit = page.locator('[data-testid="form_submit"]');
    const formLessonAdd = page.locator('[data-testid="form_lesson_add"]')

    await expect(formTitle).toBeVisible();
    await expect(formSlug).toBeVisible();
    await expect(formDescription).toBeVisible();
    await expect(formCategory).toBeVisible();
    await expect(formSubmit).toBeVisible();

    // Fyll ut alle feltene med verdier
    await formTitle.fill("title");
    await formSlug.fill("slug");
    await formDescription.fill("description");
    
    // Vent på at `form_category` inneholder `option`-elementer
    await formCategory.waitFor();
    await formCategory.selectOption({ index: 1 });

    // Klikk på knappen som går til steget "Leksjoner"
    const lessonsButton = page.locator('button', { hasText: 'Leksjoner' });
    await expect(lessonsButton).toBeVisible();
    await lessonsButton.click();
  
    await page.waitForTimeout(500)
      await expect(formLessonAdd).toBeVisible({ timeout: 10000 })
    });
  });
  */
 
test.describe("When added new lesson", () => {
    test("Should have disabled submit btn", async () => {
      const formSubmit = page.locator('[data-testid="form_submit"]');
      await expect(formSubmit).toBeVisible({timeout: 10000})
   });
    test("Should have no errors", async () => {
    const formError = page.locator('[data-testid="form_error"]');
    await expect(formError).not.toBeVisible({timeout: 10000})
    
  });
    test("Should have no success", async () => {
    const formSuccess = page.locator('[data-testid="form_success"]');
    await expect(formSuccess).not.toBeVisible({timeout: 10000})
  });
    test("Should have test-id lessons", async () => {
    const lessons = page.locator('[data-testid="lessons"]');
    await expect(lessons).toHaveCount(0, { timeout: 10000 });
    });
  test("Should have test-id form_lesson_add", async () => {
    const formLessonAdd = page.locator('[data-testid="form_lesson_add"]');
    const formTitle = page.locator('[data-testid="form_title"]');
    const formSlug = page.locator('[data-testid="form_slug"]');
    const formDescription = page.locator('[data-testid="form_description"]');
    const formCategory = page.locator('[data-testid="form_category"]');
    const formSubmit = page.locator('[data-testid="form_submit"]');
    
    await expect(formTitle).toBeVisible();
    await expect(formSlug).toBeVisible();
    await expect(formDescription).toBeVisible();
    await expect(formCategory).toBeVisible();
    await expect(formSubmit).toBeVisible();

    // Fyll ut alle feltene med verdier
    await formTitle.fill("title");
    await formSlug.fill("slug");
    await formDescription.fill("description");
    
    // Vent på at form_category inneholder option-elementer
    await formCategory.waitFor();
    await formCategory.selectOption({ index: 1 });

    // Klikk på knappen som går til steget "Leksjoner"
    const lessonsButton = page.locator('button', { hasText: 'Leksjoner' });
    await expect(lessonsButton).toBeVisible();
    await lessonsButton.click();
    
    // venter på webkit for å unngå timing problemer
    await page.waitForTimeout(2000)
    await expect(formLessonAdd).toBeVisible({ timeout: 15000 });
    await expect(formLessonAdd).toBeEnabled({ timeout: 15000 });
  });
  test("Should have test-id form_lesson_title", async () => {
    const formLessonAdd = page.locator('[data-testid="form_lesson_add"]');
    const formLessonTitle = page.locator('[data-testid="form_lesson_title"]');
    // Klikk på knappen som går til steget "Leksjoner"
    const lessonsButton = page.locator('button', { hasText: 'Leksjoner' });
    await expect(lessonsButton).toBeVisible();
    await lessonsButton.click();
    
    // venter på webkit for å unngå timing problemer
    await page.waitForTimeout(2000)
    // await formLessonAdd.waitFor({state: 'attached', timeout: 15000 });
    await expect(formLessonAdd).toBeVisible({ timeout: 15000 });
    await formLessonAdd.click({ force: true })
      
    await formLessonTitle.waitFor({ timeout: 15000 })
    await expect(formLessonTitle).toBeVisible({timeout: 1500})  
  });
    test("Should have test-id form_lesson_slug", async () => {
    const formTitle = page.locator('[data-testid="form_title"]');
  const formSlug = page.locator('[data-testid="form_slug"]');
  const formDescription = page.locator('[data-testid="form_description"]');
  const formCategory = page.locator('[data-testid="form_category"]');
  const formSubmit = page.locator('[data-testid="form_submit"]');
  const formLessonAdd = page.locator('[data-testid="form_lesson_add"]');
  const formLessonSlug = page.locator('[data-testid="form_lesson_slug"]');

  // Sørg for at alle feltene er synlige i første steg
  await expect(formTitle).toBeVisible({ timeout: 15000 });
  await expect(formSlug).toBeVisible({ timeout: 15000 });
  await expect(formDescription).toBeVisible({ timeout: 15000 });
  await expect(formCategory).toBeVisible({ timeout: 15000 });
  await expect(formSubmit).toBeVisible({ timeout: 15000 });

  // Fyll ut alle feltene i første steg
  await formTitle.fill("title");
  await formSlug.fill("slug");
  await formDescription.fill("description");
  await formCategory.waitFor();
  await formCategory.selectOption({ index: 1 });

  // Klikk på knappen som går til steg 2, "Leksjoner"
  const lessonsButton = page.locator('button', { hasText: 'Leksjoner' });
  await expect(lessonsButton).toBeVisible({ timeout: 15000 });
  await lessonsButton.click();
  await page.waitForTimeout(500);

  // Klikk på "Ny leksjon"-knappen for å legge til en ny leksjon
  await formLessonAdd.waitFor({ timeout: 15000 });
  await expect(formLessonAdd).toBeVisible({ timeout: 15000 });
  await expect(formLessonAdd).toBeEnabled({ timeout: 15000 });
  await formLessonAdd.click();

  // Verifiser at form_lesson_slug er synlig
  await formLessonSlug.waitFor({ timeout: 15000 });
  await expect(formLessonSlug).toBeVisible({ timeout: 15000 });  
});
    

  test("Should have test-id form_lesson_preAmble", async () => {
     const formLessonAdd = page.locator('[data-testid="form_lesson_add"]');
    const formLessonPreAmble = page.locator('[data-testid="form_lesson_preAmble"]');

    // Klikk på knappen som går til steget "Leksjoner"
    const lessonsButton = page.locator('button', { hasText: 'Leksjoner' });
    await expect(lessonsButton).toBeVisible();
    await lessonsButton.click();

    // Vent til "Ny leksjon"-knappen er synlig og klikk på den
    await expect(formLessonAdd).toBeVisible({ timeout: 15000 });
    await formLessonAdd.click();

    // Verifiser at `form_lesson_preAmble`-feltet er synlig
    await formLessonPreAmble.waitFor({ timeout: 15000 });
    await expect(formLessonPreAmble).toBeVisible({ timeout: 15000 });
  });
  test("Should have one lesson", async () => {
     const formLessonAdd = page.locator('[data-testid="form_lesson_add"]');
    const lessonsList = page.locator('[data-testid="lessons"]');

    // Klikk på knappen som går til steget "Leksjoner"
    const lessonsButton = page.locator('button', { hasText: 'Leksjoner' });
    await expect(lessonsButton).toBeVisible();
    await lessonsButton.click();

    // Vent til "Ny leksjon"-knappen er synlig og klikk på den
    await expect(formLessonAdd).toBeVisible({ timeout: 15000 });
    await formLessonAdd.click({force: true});

    // Vent til leksjonslisten har én leksjon
    await expect(lessonsList).toHaveCount(1, { timeout: 20000 });
  });
  });
  
}); // END FOR main describe
  
/*
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
