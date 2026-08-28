# Chen Xing Portfolio Shared UI Specification

Version: 1.13.5
Status: locked for initial implementation
Owner: Chen Xing

## Visual Point Of View

- Product-first editorial portfolio: real product interfaces and demo videos carry the visual weight.
- Dark neutral canvas with precise silver-white typography, one restrained metallic-silver signal accent, and frosted glass controls.
- Glass is an operational material for navigation, media controls, metadata, and actions. It is not a page-wide decoration.
- A thin "design signal" line is the only persistent signature motif across pages.
- Avoid decorative gradients, floating blobs, equal-weight SaaS card grids, and unapproved generic AI imagery. The supplied monochrome portrait artwork is an approved focal image for the intro section.
- Locked copy:
  - `陈兴 / UI设计师 · AI产品设计负责人`
  - `5年 UI 设计经验，专注 B 端 AI 产品、复杂工作台、组件系统与产品落地。`
- Do not display project-status labels such as `公开案例`, `内部项目 / NDA`, `已上线`, or `投资阶段`.

## Color System

- Canvas: `#080A0C`
- Raised canvas: `#0E1114`
- Soft surface: `#14181C`
- Primary text: `#F3F6F7`
- Secondary text: `rgba(243, 246, 247, 0.68)`
- Muted text: `rgba(243, 246, 247, 0.46)`
- Hairline: `rgba(255, 255, 255, 0.12)`
- Glass fill: `rgba(13, 17, 20, 0.48)`
- Signal silver: `#C7CDD1`
- Signal silver bright: `#F3F6F7`
- Metallic silver: `#C7CDD1`
- Metallic silver soft: `rgba(199, 205, 209, 0.18)`
- Error: `#FF8178`
- Success: `#86D6A5`

## Typography

- Primary Chinese stack: `Noto Sans SC`, `Source Han Sans SC`, `PingFang SC`, `Microsoft YaHei`, sans-serif.
- Latin and numeric stack: `Rubik`, `Segoe UI Variable Text`, `Segoe UI`, Arial, sans-serif.
- Display art sans stack: `Futura Md BT Medium`, `Bahnschrift`, `Segoe UI`, sans-serif; use for English brand and large mixed-script headings.
- Condensed label stack: `Futura LtCn BT Light`, `Franklin Gothic Demi Cond`, `Arial Narrow`, sans-serif; use for eyebrows, project codes, navigation English labels, and metadata.
- Fonts use local/system fallbacks and never depend on Google Fonts at runtime.
- Display: `clamp(52px, 8vw, 124px)`, line-height `0.96`, weight `300`.
- Page heading: `clamp(40px, 5.2vw, 76px)`, line-height `1.04`, weight `300`.
- Section heading: `clamp(30px, 3vw, 48px)`, line-height `1.12`, weight `350`.
- Project heading: `clamp(25px, 2.5vw, 39px)`, line-height `1.12`, weight `450`.
- Subheading: `20px`, line-height `1.5`, weight `450`.
- Body: `16px`, line-height `1.8`, weight `400`.
- Supporting: `14px`, line-height `1.75`, weight `400`.
- Meta: `11px`, line-height `1.4`, weight `600`, uppercase Latin only where appropriate.
- All text uses normal letter spacing. Negative tracking is prohibited.
- Display art sans may use positive tracking from `0.04em` to `0.12em` to preserve its poster-like rhythm; body Chinese text stays at `0`.
- Large Chinese headings use lighter weight and more line height than the previous version; hierarchy comes from scale and whitespace rather than heavy bold weight.
- Project cards reveal individually from scroll with a 360ms stagger between items and a roughly 1s entrance, preserving uninterrupted page scrolling.
- BILUS 3.0 is the approved live-product card exception: it keeps the shared card pattern but exposes a separate direct website action with an external-link cue.
- On hover, the BILUS live action uses a restrained silver highlight and compact frosted access cue; it must not cover neighboring project media or compete with video playback.
- Custom display override: local `A Nice Day` is used for every oversized English title, project title, next-project label, and the English about statement.
- Custom pixel override: local `Bei Ban Pixel` is used for Chinese section headings, project headings, capability headings, and timeline headings.
- Major headings keep at least `24px` below and `48px` above adjacent body groups.

## Layout And Safe Area

- Desktop canvas reference: `1440px`.
- Content max width: `1280px`; editorial text max width: `720px`.
- Desktop horizontal padding: `80px`; tablet: `40px`; mobile: `20px`.
- Main content stays at least `32px` from viewport edges on desktop.
- Grid: 12 columns, `24px` gutters; supported spans include 3/12, 4/12, 6/12, and 8/12.
- Mobile collapses to one column below `768px`.
- Navbar height: `72px` desktop, `64px` mobile.
- Section spacing: `112px` desktop, `80px` tablet, `64px` mobile.
- Footer minimum height: `240px` desktop, `200px` mobile.

## Navigation

- Desktop: fixed glass bar with identity on the left, primary links in the middle, resume action on the right.
- Project dropdown may open on hover and keyboard focus; it contains project names only, never status labels.
- Mobile: three-line menu button opens a right-side sheet. Focus is trapped while open; Escape closes it.
- Active navigation uses text color and a short signal line, not a pill badge.

## Buttons And Controls

- Primary action: solid off-white fill, dark text, one-line label.
- Secondary action: glass surface, white text, one-line label.
- Text action: no container; icon follows label.
- Large: `60px` or `44px` height depending on prominence.
- Medium: `36px` or `32px` height.
- Small: `28px` or `24px` height.
- Required states: default, hover, focus-visible, pressed, loading, disabled.
- Pressed state moves `1px` vertically; no dramatic scale.
- Focus-visible uses a `2px` silver outline with `3px` offset.
- Sidebar buttons are full-width text rows with a leading project number.
- Pagination uses previous/next text with directional Lucide icons.

## Cards And Media

- Project cards are image-first editorial rows, not floating glass panels. On the homepage selected-work section they use restrained raised surfaces, sequential scroll reveal, and one unified hover/focus response across the four projects; the section title is localized as `作品集` in Chinese mode and remains `SELECTED WORK` in English mode.
- Media radius: `8px`; compact control radius: `6px`; pill radius only for circular or compact control groups.
- Card text padding: at least `20px` mobile and `28px` desktop.
- Selected card: primary text plus visible signal line.
- Unselected card: secondary text and hairline divider.
- Unified micro-interaction: media scales to `1.015`, crop shifts subtly, and title moves no more than `4px` over `240ms`.
- Every video requires a local poster image and an explicit play control. Autoplay video is muted.
- Media controls use `24px` Lucide icons; inline icons use `16px`; statement icons may use `32px` or `48px`.

## Liquid Glass

- Fill: `rgba(13, 17, 20, 0.48)`.
- Backdrop blur: `16px` desktop, `12px` mobile.
- Border: one-pixel translucent white hairline.
- Inner highlight only; no colored glow or large shadow.
- Use only for navigation, media controls, contact actions, and compact project metadata.

## Motion Baseline

- Hover and press feedback: `160ms` to `220ms`.
- Card and media transitions: `240ms` to `320ms`.
- Page transition: `400ms` maximum.
- Default easing: `cubic-bezier(0.16, 1, 0.3, 1)`.
- Scroll reveals run once and animate only transform and opacity.
- The design-signal line may move continuously at low contrast; no other ambient loop is allowed.
- Pointer feedback: keep the native system cursor visible with no custom glow, canvas, ribbon, trail, core dot, or halo. The page remains visually quiet under pointer movement.
- Intro visual interaction: the second visual section uses a dark veil for separation; its centered head statement is revealed once on scroll.
- Intro visual reveal: the centered `ABOUT ME` title is visible first, then fades out before the profile layer begins to move upward. The two states must not visually crowd each other. The about statement spans the full 1280px safe area without an outer border and settles close to the bottom safe area instead of floating in the upper half. A soft frosted veil moves upward over the supplied portrait as the section scrolls into view. Keep the profile layer readable through the full pinned portrait travel; it does not fade out while the section is active and leaves only when the frame itself exits the viewport. The portrait frame fills the viewport; the transition band before the next section stays compact at about `8vh` on desktop and `5vh` on mobile.
- Skill spectrum: an auto-rotating 9:16 card orbit sits directly below the work experience timeline and before the selected-work list. It presents six disciplines in this order: UI design, UX design, video editing, frontend development, graphic design, and client communication. Each card takes the center position in sequence; only the centered card receives a restrained full-card frosted veil with its role and responsibility copy. Center cards recede farther than edge cards to form a clear concave arc without overlap. The six supplied monochrome skill images are locally hosted as optimized WebP assets. Hover/focus copy is CSS-driven so pointer movement does not trigger React re-renders; the orbit uses an intersection-gated animation loop with no scroll or wheel handler, pauses completely outside the viewport, and keeps its sticky travel compact at `150svh` desktop and `168svh` mobile so the user moves through it more quickly without trapping vertical reading. Reduced-motion users see one readable card.
- Work experience: the section uses a modern-vintage newspaper archive layout rather than floating cards. A fixed left column carries the career masthead, a concise positioning statement, and a neatly aligned design-tool index; its tool marks fall in a staggered sequence and settle into the bottom of the column. The right side is a full-width three-row table for the three chronological roles, with role, company, work content, and results separated by low-contrast silver rules and generous row spacing. Keep the top edge quiet: use one short signal segment on the section boundary and avoid a full-width table rule. The left column stays pinned at the top while the three right rows reveal in sequence as the user scrolls; each row enters with a restrained offset-and-scale transition, then responds to hover or keyboard focus with a short signal bar and content lift. Keep a distinct transition band after the portrait section: the experience section starts with `clamp(96px, 12vh, 180px)` desktop and `72px` mobile separation, followed by generous internal top padding (`clamp(168px, 21vh, 280px)` desktop, `132px` mobile) so the next heading does not crowd the person visual. The archive uses the site's dark canvas, raised surfaces, silver-white type, and signal-silver rules instead of a beige newsprint palette; it keeps serif editorial headings, square tool marks, and no rounded-card treatment.
- Work experience typography: each row uses an explicit three-level order: role first, company second, and work content third. Role and company share one identity column and stack vertically, while work content gets the wider adjacent column. The role is the primary row heading at `clamp(21px, 1.75vw, 29px)` on desktop and `clamp(22px, 7vw, 28px)` on mobile; company is a secondary line at `13px` to `15px`; work content receives its own field label before the summary and highlights, with generous line height and a visible gap before the result bullets.
- Loading screen: the supplied loading film plays only its first four seconds and pauses at the four-second frame. The film is framed beyond the content safe area with an approximately `8vw` desktop and `9vw` mobile right shift, plus a modest cover scale, so its flower aligns with the homepage composition without exposing a hard edge. The upper frosted layer uses a stronger light-to-dark cut and an oversized art-sans `PORTFOLIO` title pushed below the glass edge so only part of the word is revealed; restrained metadata keeps the composition legible. The left-aligned counter stays open without a surrounding rule or meter. It then leaves through a pure `1.45s` opacity dissolve with no sweep or directional movement. The homepage video starts at the beginning of this dissolve so both scenes overlap briefly. The counter reaches `100%` with the four-second playback.
- Language control: the header uses a compact `中 / EN` flip control. It persists the selected language locally and updates navigation plus project-list copy without replacing the downloadable resume action in the footer. Art-directed English display headings remain in English in both language modes, while every visible project name, including media captions and next-project labels, uses its Chinese name in Chinese mode and its English name in English mode.
- Motion is interruptible and never blocks navigation.
- With `prefers-reduced-motion: reduce`, stop autoplay, continuous signal motion, parallax, and reveal transitions.

## Accessibility And Availability

- Body text contrast targets WCAG AA at minimum.
- All controls work with keyboard, show focus, and expose accessible names.
- VoiceOver and TalkBack reading order follows visual order; decorative media uses empty alt text.
- External links announce that they open a new window.
- Core project narratives live inside the site. External links are secondary and may fail without making a case study unavailable.
- Videos, posters, fonts, and key images are locally hosted or served from the same controlled asset origin.
- Images use AVIF/WebP where available with a standard fallback; videos load lazily beyond the first viewport.

## Footer

- Full-width dark band with a large contact statement, email action, resume download, and compact contact details.
- No nested cards. Dividers and typography establish hierarchy.
- The footer repeats primary contact actions so users do not need to open a separate page.

## Locked Rules

- Preview styles remain locked unless Chen Xing explicitly requests a shared-style change.
- Button labels stay on one line.
- No project status labels.
- No replacement or paraphrase of the locked personal-positioning copy.
- No external-only case study.
