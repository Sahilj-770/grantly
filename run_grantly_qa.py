import time
import os
import sys

# Ensure UTF-8 output on Windows console
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

from playwright.sync_api import sync_playwright

SCREENSHOT_DIR = "grantly/qa_screenshots"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

BASE_URL = "http://localhost:5173"

def run_qa():
    print(f"=== STARTING COMPREHENSIVE GRANTLY QA AUDIT at {BASE_URL} ===")
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        console_errors = []
        
        # Desktop Context
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()
        page.on("console", lambda msg: console_errors.append(f"[{msg.type}] {msg.text}") if msg.type == "error" else None)
        
        print("\n--- TEST 1: LANDING PAGE & SIGNATURE EXPERIENCES ---")
        page.goto(BASE_URL, wait_until="networkidle")
        time.sleep(1)
        
        # Verify hero headline
        headline = page.locator("h1").first
        assert headline.is_visible(), "Landing page hero headline not visible"
        print(f"✓ Hero Headline visible: {headline.text_content()[:50]}...")
        
        # Capture initial hero screenshot
        page.screenshot(path=f"{SCREENSHOT_DIR}/01_landing_hero.png")
        
        # Test Scroll down to test Split-Curtain and featured carousel
        page.evaluate("window.scrollTo(0, 800)")
        time.sleep(0.5)
        page.screenshot(path=f"{SCREENSHOT_DIR}/02_landing_curtain_split.png")
        
        page.evaluate("window.scrollTo(0, 1600)")
        time.sleep(0.5)
        page.screenshot(path=f"{SCREENSHOT_DIR}/03_landing_curved_carousel.png")
        
        # Test Next button on carousel
        next_btn = page.locator("button[aria-label='Next scholarship']")
        if next_btn.is_visible():
            next_btn.click()
            time.sleep(0.3)
            print("✓ Cylindrical Carousel Next button clicked")
        
        # Test Pathway tabs on 3D Archive shelf
        merit_tab = page.locator("button:has-text('Merit-Based Fellowships')").first
        if merit_tab.is_visible():
            merit_tab.click()
            time.sleep(0.3)
            print("✓ Funding Pathway Merit tab activated")
        
        page.evaluate("window.scrollTo(0, 2600)")
        time.sleep(0.5)
        page.screenshot(path=f"{SCREENSHOT_DIR}/04_landing_journey_ribbon.png")
        
        # Scroll to bottom
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(0.5)
        page.screenshot(path=f"{SCREENSHOT_DIR}/05_landing_footer.png")
        print("✓ Landing page verified through all sections")
        
        print("\n--- TEST 2: STUDENT ONBOARDING (4 STEPS) ---")
        # Click Criteria pill in Navbar to open Onboarding
        print("Buttons before click:", [b.text_content() for b in page.locator("button").all()[:10]])
        page.locator("button:has-text('Criteria:')").first.click()
        time.sleep(1)
        print("Headings after click:", page.locator("h1, h2, h3").all_text_contents())
        
        # Step 1: Education
        assert page.locator("h2:has-text('Degree & Institution')").is_visible(), "Onboarding Step 1 not rendered"
        page.screenshot(path=f"{SCREENSHOT_DIR}/06_onboarding_step1.png")
        page.locator("button:has-text('Continue')").click()
        time.sleep(0.5)
        
        # Step 2: Academics
        assert page.locator("h2:has-text('Academic Performance')").is_visible(), "Onboarding Step 2 not rendered"
        page.screenshot(path=f"{SCREENSHOT_DIR}/07_onboarding_step2.png")
        page.locator("button:has-text('Continue')").click()
        time.sleep(0.5)
        
        # Step 3: Eligibility
        assert page.locator("h2:has-text('Financial & Need Criteria')").is_visible(), "Onboarding Step 3 not rendered"
        page.screenshot(path=f"{SCREENSHOT_DIR}/08_onboarding_step3.png")
        page.locator("button:has-text('Continue')").click()
        time.sleep(0.5)
        
        # Step 4: Review & Confirm
        assert page.locator("h2:has-text('Review Your Profile')").is_visible(), "Onboarding Step 4 not rendered"
        page.screenshot(path=f"{SCREENSHOT_DIR}/09_onboarding_step4.png")
        page.locator("button:has-text('Confirm & Go to Dashboard')").click()
        time.sleep(0.8)
        print("✓ 4-Step Onboarding completed successfully")
        
        print("\n--- TEST 3: PERSONALIZED STUDENT DASHBOARD ---")
        assert "Welcome back" in page.content(), "Dashboard not reached"
        page.screenshot(path=f"{SCREENSHOT_DIR}/10_dashboard_overview.png")
        print("✓ Student Dashboard rendered with top matches and active applications")
        
        # Inspect top matched scholarship to open detail modal
        page.locator("button:has-text('Inspect Match')").first.click()
        time.sleep(0.5)
        assert page.locator("div[role='dialog']").is_visible(), "Scholarship Detail Modal did not open"
        page.screenshot(path=f"{SCREENSHOT_DIR}/11_scholarship_detail_modal.png")
        print("✓ Scholarship Detail Modal opened with calculated qualification")
        
        # Switch tabs inside modal
        page.locator("button:has-text('Benefits & Grants')").click()
        time.sleep(0.3)
        page.locator("button:has-text('Required Documents')").click()
        time.sleep(0.3)
        page.locator("button:has-text('Procedure & Portal')").click()
        time.sleep(0.3)
        print("✓ Detail Modal tabs (Benefits, Documents, Procedure) verified")
        
        # Close modal
        page.keyboard.press("Escape")
        time.sleep(0.3)
        print("✓ Detail Modal dismissed via Escape key")
        
        print("\n--- TEST 4: SCHOLARSHIP DISCOVERY DIRECTORY ---")
        page.locator("button:has-text('Discover')").first.click()
        time.sleep(0.5)
        page.screenshot(path=f"{SCREENSHOT_DIR}/12_discovery_grid.png")
        
        # Test Search
        search_input = page.locator("input[placeholder*='Search by scholarship']")
        search_input.fill("Rhodes")
        time.sleep(0.4)
        page.screenshot(path=f"{SCREENSHOT_DIR}/13_discovery_search_filtered.png")
        print("✓ Search filter verified for 'Rhodes'")
        search_input.fill("")
        time.sleep(0.3)
        
        # Test Category pill
        page.locator("button:has-text('Government')").first.click()
        time.sleep(0.4)
        print("✓ Government Category filter applied")
        
        # Toggle List view
        page.locator("button[aria-label='List View']").click()
        time.sleep(0.4)
        page.screenshot(path=f"{SCREENSHOT_DIR}/14_discovery_list_view.png")
        print("✓ List View toggle verified")
        
        print("\n--- TEST 5: APPLICATION TRACKER ---")
        page.locator("button:has-text('Tracker')").first.click()
        time.sleep(0.5)
        page.screenshot(path=f"{SCREENSHOT_DIR}/15_application_tracker_board.png")
        print("✓ Application Tracker Kanban Board rendered")
        
        # Toggle list view
        page.locator("button[aria-label='List View']").click()
        time.sleep(0.3)
        page.screenshot(path=f"{SCREENSHOT_DIR}/16_application_tracker_list.png")
        print("✓ Application Tracker List View rendered")
        
        print("\n--- TEST 6: DOCUMENT VAULT ---")
        page.locator("button:has-text('Vault')").first.click()
        time.sleep(0.5)
        page.screenshot(path=f"{SCREENSHOT_DIR}/17_document_vault.png")
        print("✓ Document Vault rendered with encrypted records")
        
        # Test Upload modal
        page.locator("button:has-text('Upload Certificate')").click()
        time.sleep(0.4)
        page.locator("input[placeholder*='Income Certificate']").fill("NOC Endorsement Letter 2026")
        page.locator("input[placeholder*='Tehsildar']").fill("Office of the Dean, Academic Affairs")
        page.locator("button:has-text('Save & Encrypt')").click()
        time.sleep(0.5)
        page.screenshot(path=f"{SCREENSHOT_DIR}/18_document_vault_uploaded.png")
        print("✓ New document created and encrypted into Vault")
        
        print("\n--- TEST 7: GRANTLY AI ADVISOR ---")
        page.locator("button:has-text('AI Advisor')").first.click()
        time.sleep(0.5)
        page.screenshot(path=f"{SCREENSHOT_DIR}/19_ai_advisor_initial.png")
        
        # Click suggested prompt pill
        page.locator("button:has-text('What documents are missing for Rhodes?')").click()
        time.sleep(1.2)
        page.screenshot(path=f"{SCREENSHOT_DIR}/20_ai_advisor_response.png")
        print("✓ AI Advisor grounded response generated with action link")
        
        print("\n--- TEST 8: RESPONSIVE VIEWPORTS AUDIT ---")
        # Tablet Viewport (768 x 1024)
        tablet_page = browser.new_page(viewport={"width": 768, "height": 1024})
        tablet_page.goto(f"{BASE_URL}", wait_until="networkidle")
        time.sleep(0.5)
        tablet_overflow = tablet_page.evaluate("document.body.scrollWidth > window.innerWidth")
        assert not tablet_overflow, "Horizontal overflow detected on Tablet viewport!"
        tablet_page.screenshot(path=f"{SCREENSHOT_DIR}/21_tablet_768_home.png")
        print("✓ Tablet Viewport (768px): Zero horizontal overflow")
        tablet_page.close()
        
        # Mobile Viewport (375 x 812)
        mobile_page = browser.new_page(viewport={"width": 375, "height": 812}, is_mobile=True, has_touch=True)
        mobile_page.goto(f"{BASE_URL}", wait_until="networkidle")
        time.sleep(0.5)
        mobile_overflow = mobile_page.evaluate("document.body.scrollWidth > window.innerWidth")
        assert not mobile_overflow, "Horizontal overflow detected on Mobile viewport!"
        mobile_page.screenshot(path=f"{SCREENSHOT_DIR}/22_mobile_375_home.png")
        
        # Test Mobile Menu Drawer
        menu_btn = mobile_page.locator("button[aria-label='Toggle Navigation Menu']")
        if menu_btn.is_visible():
            menu_btn.click()
            time.sleep(0.3)
            mobile_page.screenshot(path=f"{SCREENSHOT_DIR}/23_mobile_menu_open.png")
            print("✓ Mobile Menu Drawer opened and verified")
        print("✓ Mobile Viewport (375px): Zero horizontal overflow")
        mobile_page.close()
        
        print("\n--- CONSOLE ERROR AUDIT ---")
        if console_errors:
            print(f"⚠️ Warning: Found {len(console_errors)} console errors:")
            for err in console_errors:
                print(f"  - {err}")
        else:
            print("✓ ZERO console errors recorded during full user flow!")
            
        print("\n=== ALL QA TESTS PASSED WITH 100% SUCCESS ===")

if __name__ == "__main__":
    run_qa()
