import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clapperboard,
  CircleAlert,
  CircleCheck,
  CircleDot,
  Component,
  Copy,
  Code2,
  ChevronDown,
  Download,
  ExternalLink,
  Heart,
  Home,
  Image as ImageIcon,
  Layers3,
  Languages,
  LayoutTemplate,
  Mail,
  MessageCircle,
  Menu,
  MoveUpRight,
  Palette,
  Phone,
  Play,
  Sparkles,
  Type,
  Users,
  WandSparkles,
  X,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const BILUS_URL = 'https://www.aigcacs.com/inspiration'
const RESUME_URL = '/media/Chen-Xing-UI-Designer-Resume-2026.pdf'
const AOJIN_FIGMA_FRAME_URL = '/media/aojin-figma-export.png'

type Project = {
  slug: string
  number: string
  title: string
  titleEn: string
  english: string
  year: string
  role: string
  roleEn?: string
  intro: string
  introEn: string
  scope: string[]
  scopeEn?: string[]
  cover?: string
  video?: string
  poster?: string
  videoLabel?: string
  videoLabelEn?: string
  external?: string
  tone: 'olive' | 'warm' | 'silver'
}

const projects: Project[] = [
  {
    slug: 'bilus-3',
    number: '01',
    title: '毕鲁斯 3.0',
    titleEn: 'BILUS 3.0',
    english: 'BILUS TOOL / PRODUCT SYSTEM',
    year: '2025—2026',
    role: 'UI 设计师 / 项目负责人',
    roleEn: 'UI Designer & Project Lead',
    intro: 'C 端项目改版优化，通过真实用户反馈和上线数据持续迭代，推动体验提升与用户量实际增长。',
    introEn: 'A consumer product redesign validated through real user feedback and launch data, improving the experience and driving measurable user growth.',
    scope: ['官网改版', '核心体验优化', '用户路径', '视觉系统', '上线数据'],
    scopeEn: ['Website redesign', 'Core experience', 'User journeys', 'Visual system', 'Launch data'],
    cover: '/media/bilus-cover.png',
    external: BILUS_URL,
    tone: 'silver',
  },
  {
    slug: 'aojin-ai',
    number: '02',
    title: '奥锦装修 AI',
    titleEn: 'AOJIN AI',
    english: 'AOJIN / INTERIOR AI WORKFLOW',
    year: '2025—2026',
    role: 'UI 设计师 / 项目负责人',
    roleEn: 'UI Designer & Project Lead',
    intro: '一个简洁而闭环的装修 AI 项目，重点完成前端视觉优化，让核心流程更清晰、统一、易用。',
    introEn: 'A focused interior-design AI product with a simple closed loop, refined through front-end visual optimization for a clearer and more consistent experience.',
    scope: ['前端视觉优化', '装修 AI 闭环', '界面层级', '组件统一', '状态反馈'],
    scopeEn: ['Front-end visual polish', 'Interior AI loop', 'Interface hierarchy', 'Component consistency', 'State feedback'],
    cover: '/media/aojin-cover.png',
    video: '/media/aojin-demo.mp4',
    poster: '/media/aojin-poster.jpg',
    videoLabel: '奥锦装修 AI 产品演示',
    videoLabelEn: 'AOJIN AI product demo',
    tone: 'warm',
  },
  {
    slug: 'qiaxu-ai',
    number: '03',
    title: '恰序 AI',
    titleEn: 'QIA XU AI',
    english: 'QIA XU / INTERNAL AI PRODUCT',
    year: '2025—2026',
    role: 'UI 设计师 / 项目负责人',
    roleEn: 'UI Designer & Project Lead',
    intro: '面向 B 端 AI 场景，围绕工作台、任务流和反馈状态建立清晰的产品结构与视觉系统。',
    introEn: 'A B2B AI product structured around a clear workspace, task flow, feedback states, and a coherent visual system.',
    scope: ['B 端产品结构', '工作台', 'AI 任务流', '反馈状态', '视觉系统'],
    scopeEn: ['B2B product structure', 'Workspace', 'AI task flow', 'Feedback states', 'Visual system'],
    cover: '/media/qiaxu-cover.png',
    video: '/media/qiaxu-demo.mp4',
    poster: '/media/qiaxu-poster.jpg',
    videoLabel: '恰序 AI 产品演示',
    videoLabelEn: 'QIA XU AI product demo',
    tone: 'olive',
  },
  {
    slug: 'wowo',
    number: '04',
    title: '窝喔',
    titleEn: 'WOWO',
    english: 'WOWO / BRAND & PRODUCT VISUALS',
    year: '2025—2026',
    role: '视觉设计负责人',
    roleEn: 'Visual Design Lead',
    intro: '从模糊需求出发，完成 C 端项目从产品定位、视觉设计到最终落地的全流程推进。',
    introEn: 'A consumer product taken from an unclear brief through positioning, visual design, and full delivery.',
    scope: ['需求澄清', '产品定位', 'C 端项目结构', '品牌视觉', '产品界面', '全流程落地'],
    scopeEn: ['Brief clarification', 'Product positioning', 'Consumer product structure', 'Brand visuals', 'Product interface', 'End-to-end delivery'],
    cover: '/media/wowo-cover.png',
    video: '/media/wowo-demo.mp4',
    poster: '/media/wowo-poster.jpg',
    videoLabel: '窝喔视觉演示',
    videoLabelEn: 'WOWO visual demo',
    tone: 'silver',
  },
]

const navItems = [
  { label: '首页', en: 'Home', to: '/' },
  { label: '作品', en: 'Work', to: '/work' },
  { label: '关于我', en: 'About', to: '/about' },
  { label: '联系', en: 'Contact', to: '/contact' },
]

const projectCategoryZh: Record<string, string> = {
  'bilus-3': '毕鲁斯工具 / 产品系统',
  'aojin-ai': '奥锦 / 装修 AI 工作流',
  'qiaxu-ai': '恰序 / 内部 AI 产品',
  wowo: '窝喔 / 品牌与产品视觉',
}

function localized<T>(language: Language, zh: T, en: T): T {
  return language === 'en' ? en : zh
}

type Language = 'zh' | 'en'

type CaseStudy = {
  overviewTitle: string
  overviewTitleAccent: string
  overviewTitleEn: string
  overviewTitleAccentEn: string
  overview: string
  overviewEn: string
  process: Array<[string, string]>
  processEn: Array<[string, string]>
  note: string
  noteEn: string
}

const caseStudies: Record<string, CaseStudy> = {
  'bilus-3': {
    overviewTitle: '从体验改版，',
    overviewTitleAccent: '到真实增长。',
    overviewTitleEn: 'FROM REDESIGN',
    overviewTitleAccentEn: 'TO REAL GROWTH.',
    overview: '这不是一次单纯的视觉换新，而是围绕 C 端产品进行的系统性改版。项目从用户使用反馈出发，重新梳理页面结构、内容层级和核心操作路径，再通过视觉优化提升产品的清晰度与吸引力。设计上线后结合真实数据持续观察和迭代，用户量获得了实际提升。',
    overviewEn: 'This was not a surface-level visual refresh, but a system-level redesign for a consumer product. Starting from user feedback, I reworked page structure, content hierarchy, and core journeys, then used visual refinement to make the product clearer and more compelling. The design was observed and iterated against real launch data, leading to actual user growth.',
    process: [
      ['分析真实问题', '结合用户反馈和产品使用数据，定位页面结构、信息层级和核心路径中的体验问题。'],
      ['重构产品体验', '围绕 C 端产品的核心场景，完成页面改版、用户路径优化和视觉系统升级。'],
      ['上线验证增长', '与产品和开发协作完成上线，并根据真实数据持续验证和优化设计方案。'],
    ],
    processEn: [
      ['Read the real signals', 'Used user feedback and product data to identify issues in structure, hierarchy, and core journeys.'],
      ['Rebuild the experience', 'Redesigned the core consumer product experience through page updates, journey refinement, and a visual system upgrade.'],
      ['Validate growth after launch', 'Worked with product and engineering through launch, then iterated against real data.'],
    ],
    note: '这个项目体现了我不仅能做界面，还能把设计放进真实产品环境中，用用户反馈和业务数据验证设计结果。',
    noteEn: 'This project shows that I can place design inside a real product environment and validate its value through user feedback and business data.',
  },
  'aojin-ai': {
    overviewTitle: '简洁流程，',
    overviewTitleAccent: '精确视觉。',
    overviewTitleEn: 'A SIMPLE FLOW,',
    overviewTitleAccentEn: 'A PRECISE VISUAL LANGUAGE.',
    overview: '奥锦装修 AI 的核心流程相对简洁，项目重点并不是增加复杂功能，而是把已有流程通过更准确的视觉语言表达出来。设计工作围绕界面层级、色彩、组件、信息反馈和关键状态展开，在不增加使用负担的前提下，让产品看起来更清晰、更统一，也更具产品完成度。',
    overviewEn: 'AOJIN AI has a focused, closed-loop workflow. The work was not about adding complexity, but about expressing the existing product more accurately through visual language. I refined hierarchy, color, components, feedback, and key states so the product became clearer, more consistent, and more complete without adding friction.',
    process: [
      ['理解产品闭环', '先明确装修 AI 的核心任务和使用路径，确认每个页面在完整流程中的作用。'],
      ['提炼视觉语言', '围绕界面层级、组件关系、状态反馈和视觉细节建立统一的前端表达。'],
      ['完善落地细节', '与开发配合完成界面还原和细节走查，让视觉优化真正进入产品。'],
    ],
    processEn: [
      ['Understand the loop', 'Mapped the core interior-design AI task and clarified the role of each screen in the full flow.'],
      ['Refine the visual language', 'Built a consistent front-end expression through hierarchy, component relationships, feedback, and detail.'],
      ['Polish the delivery', 'Worked with engineering on visual fidelity and detail review so the refinement reached the product.'],
    ],
    note: '这个项目体现了我在明确产品边界下进行视觉优化的能力，能够用较少的设计变化，明显提升产品的专业度和使用感受。',
    noteEn: 'This project shows my ability to improve a focused product with restraint, using a small number of precise changes to raise its polish and usability.',
  },
  'qiaxu-ai': {
    overviewTitle: '让复杂任务，',
    overviewTitleAccent: '变得可理解。',
    overviewTitleEn: 'MAKE COMPLEX TASKS',
    overviewTitleAccentEn: 'EASIER TO UNDERSTAND.',
    overview: '恰序 AI 是一个以工作台和任务流程为核心的 B 端产品。设计重点不只是制作页面，而是先理解用户角色、工作目标和任务关系，再将复杂操作整理成清晰的界面层级。项目围绕任务结构、AI 反馈、工作台信息组织和视觉系统展开，让产品在复杂业务场景下依然保持可理解、可操作和可持续扩展。',
    overviewEn: 'QIA XU AI is a B2B product centered on a workspace and task flows. The work went beyond producing screens: I first understood user roles, goals, and task relationships, then organized complex operations into clear interface hierarchy. The result connects task structure, AI feedback, workspace organization, and a scalable visual system.',
    process: [
      ['梳理业务关系', '理解 B 端业务目标、用户角色和任务关系，建立可以讨论的产品结构。'],
      ['搭建任务工作台', '围绕核心任务设计工作台层级、AI 任务流和输入到反馈的连续体验。'],
      ['建立系统交付', '完善组件、视觉规范和关键状态，让复杂产品具备持续扩展和协作落地的基础。'],
    ],
    processEn: [
      ['Map the business', 'Understood B2B goals, user roles, and task relationships to create a shared product structure.'],
      ['Build the task workspace', 'Designed the workspace hierarchy, AI task flow, and continuous experience from input to feedback.'],
      ['Deliver a system', 'Defined components, visual rules, and key states to support future scale and team delivery.'],
    ],
    note: '这个项目体现了我处理复杂 B 端产品的能力：先理解业务，再组织结构，最后通过系统化设计完成界面落地。',
    noteEn: 'This project shows how I handle complex B2B products: understand the business first, organize the structure, and deliver the interface through a coherent system.',
  },
  wowo: {
    overviewTitle: '从模糊需求，',
    overviewTitleAccent: '到完整落地。',
    overviewTitleEn: 'FROM AN UNCLEAR BRIEF',
    overviewTitleAccentEn: 'TO FULL DELIVERY.',
    overview: '窝喔项目开始时需求还处于探索阶段，设计工作首先不是制作界面，而是帮助项目逐步明确方向。通过梳理目标、用户、产品定位和视觉气质，将模糊的想法转化为可讨论、可执行的产品结构，再继续推进品牌表达、核心界面、展示物料和最终交付，完成 C 端项目的全流程落地。',
    overviewEn: 'WOWO began with an evolving brief. The first design task was not to make screens, but to help the project find a clear direction. By clarifying goals, users, positioning, and visual character, I turned an unclear idea into an actionable product structure, then carried it through brand expression, core interfaces, presentation materials, and final delivery.',
    process: [
      ['澄清项目方向', '从目标、用户和产品定位出发，把模糊需求整理成可以讨论和决策的问题。'],
      ['建立产品与视觉', '搭建 C 端项目的结构，同时建立品牌气质、产品界面和展示语言。'],
      ['推动全流程落地', '协作推进设计交付、展示物料和项目落地，让想法变成完整可用的产品体验。'],
    ],
    processEn: [
      ['Clarify the direction', 'Turned an unclear brief into concrete questions around goals, users, and product positioning.'],
      ['Build product and visual identity', 'Structured the consumer product while defining its brand character, interface, and presentation language.'],
      ['Drive end-to-end delivery', 'Moved design delivery, presentation materials, and project implementation forward until the idea became a complete experience.'],
    ],
    note: '这个项目体现了我从模糊需求中建立方向、从概念推进到落地的能力，也体现了我对 C 端项目的整体负责意识。',
    noteEn: 'This project shows my ability to create direction from ambiguity and carry a consumer project from concept to delivery with full ownership.',
  },
}

type DualCopy = { zh: string; en: string }
type JourneyStep = { stage: DualCopy; title: DualCopy; goal: DualCopy; detail: DualCopy }
type SceneCard = { scene: DualCopy; strategy: DualCopy; reason: DualCopy }
type MetricCard = { value: DualCopy; label: DualCopy; detail: DualCopy }
type EvidenceRow = { before: DualCopy; decision: DualCopy; signal: DualCopy }
type EmotionCard = { layer: DualCopy; title: DualCopy; decision: DualCopy; purpose: DualCopy }
type CaseNarrative = {
  problemTitle: DualCopy
  problemBody: DualCopy
  problemPoints: DualCopy[]
  hypothesis: DualCopy
  journey: JourneyStep[]
  scenes: SceneCard[]
  metrics: MetricCard[]
  evidence: EvidenceRow[]
  emotion: EmotionCard[]
  components?: Array<{ name: DualCopy; state: DualCopy }>
  states?: Array<{ label: DualCopy; note: DualCopy; tone: 'quiet' | 'active' | 'danger' }>
  systemSummary: DualCopy
  perspective: DualCopy
}

const dual = (zh: string, en: string): DualCopy => ({ zh, en })

const systemLayers: Array<{ icon: 'palette' | 'type' | 'component' | 'layout' | 'layers'; name: DualCopy; detail: DualCopy }> = [
  { icon: 'palette', name: dual('原子 / 色彩', 'Atoms / Color'), detail: dual('主色、状态色、表面层级与对比度规则。', 'Brand, status, surface, and contrast rules.') },
  { icon: 'type', name: dual('原子 / 字体', 'Atoms / Type'), detail: dual('标题、正文、辅助信息的字号与行高阶梯。', 'Type scale and line-height rhythm for every role.') },
  { icon: 'component', name: dual('分子 / 组件', 'Molecules / Components'), detail: dual('按钮、输入、标签、卡片等高频交互单元。', 'Buttons, inputs, tags, and cards for repeated actions.') },
  { icon: 'layout', name: dual('组织 / 结构', 'Organisms / Structure'), detail: dual('导航、列表、工作台与反馈区域的组合方式。', 'Navigation, lists, workspaces, and feedback regions.') },
  { icon: 'layers', name: dual('模板 / 页面', 'Templates / Pages'), detail: dual('将场景、内容和组件组合成可交付页面。', 'Reusable page compositions for real product scenarios.') },
]

const reusableComponents: Array<{ name: DualCopy; state: DualCopy }> = [
  { name: dual('主按钮', 'Primary button'), state: dual('默认 / 悬停 / 禁用', 'Default / hover / disabled') },
  { name: dual('输入框', 'Input field'), state: dual('空 / 聚焦 / 错误', 'Empty / focused / error') },
  { name: dual('筛选标签', 'Filter chip'), state: dual('未选 / 已选 / 溢出', 'Idle / selected / overflow') },
  { name: dual('内容卡片', 'Content card'), state: dual('默认 / 加载 / 空态', 'Default / loading / empty') },
  { name: dual('进度反馈', 'Progress feedback'), state: dual('等待 / 处理中 / 完成', 'Waiting / processing / done') },
  { name: dual('导航栏', 'Navigation bar'), state: dual('默认 / 当前项 / 折叠', 'Default / current / collapsed') },
  { name: dual('结果面板', 'Result panel'), state: dual('预览 / 编辑 / 分享', 'Preview / edit / share') },
  { name: dual('通知提示', 'Toast notice'), state: dual('成功 / 风险 / 失败', 'Success / warning / error') },
  { name: dual('空状态', 'Empty state'), state: dual('首用 / 日常 / 恢复', 'First use / daily / recover') },
]

const stateShowcase: Array<{ label: DualCopy; note: DualCopy; tone: 'quiet' | 'active' | 'danger' }> = [
  { label: dual('空状态', 'EMPTY'), note: dual('给出下一步，而不是只说“暂无内容”。', 'Offer a next step instead of only saying “nothing here”.'), tone: 'quiet' },
  { label: dual('加载状态', 'LOADING'), note: dual('让等待有进度，减少重复点击和不确定感。', 'Make waiting legible and prevent duplicate actions.'), tone: 'active' },
  { label: dual('错误状态', 'ERROR'), note: dual('解释原因，保留恢复路径与已输入内容。', 'Explain the cause and preserve a recovery path.'), tone: 'danger' },
  { label: dual('完成状态', 'DONE'), note: dual('用轻量反馈确认结果，并引导下一步。', 'Confirm the result lightly and point to what comes next.'), tone: 'active' },
]

const caseNarratives: Record<string, CaseNarrative> = {
  'bilus-3': {
    problemTitle: dual('灵感很多，下一步却不够清楚。', 'Inspiration was everywhere; the next step was not.'),
    problemBody: dual('用户可以看到内容，却容易在浏览、收藏、创作之间来回跳转。改版的目标不是增加入口，而是把一次“看到灵感”变成可以继续完成的路径。', 'Users could find content, but moved back and forth between browsing, saving, and making. The goal was not more entry points, but a path that could continue after inspiration.'),
    problemPoints: [dual('内容层级混杂，价值需要被重新解释。', 'Content hierarchy blurred the value of each screen.'), dual('关键动作分散，用户难以形成连续任务。', 'Key actions were scattered across disconnected moments.'), dual('上线后缺少可持续验证的反馈闭环。', 'The post-launch loop needed a clearer feedback signal.')],
    hypothesis: dual('把“发现 → 选择 → 创作 → 分享”整理成一条连续旅程，让每一次点击都更接近完成。', 'Connect discover → choose → make → share into one continuous journey, so every click moves the user closer to completion.'),
    journey: [
      { stage: dual('发现需求', 'DISCOVER'), title: dual('先让灵感被看懂', 'Make the value legible'), goal: dual('3 秒内理解内容价值。', 'Understand the value in three seconds.'), detail: dual('用清晰的首屏信息和内容分组，降低进入成本。', 'Clarify the first view and group content to reduce entry cost.') },
      { stage: dual('选方案', 'CHOOSE'), title: dual('把比较变成选择', 'Turn browsing into choice'), goal: dual('快速收藏、筛选并对比。', 'Save, filter, and compare quickly.'), detail: dual('把高频动作放在内容附近，减少往返。', 'Keep high-frequency actions close to the content.') },
      { stage: dual('用产品', 'USE'), title: dual('从灵感进入工作台', 'Move into the workspace'), goal: dual('让创作动作自然接续。', 'Continue into making without a reset.'), detail: dual('用稳定的布局和状态反馈承接任务。', 'Use stable layout and feedback to carry the task forward.') },
      { stage: dual('获反馈', 'FEEDBACK'), title: dual('让结果及时回应', 'Respond at the right moment'), goal: dual('知道系统正在做什么。', 'Know what the system is doing.'), detail: dual('用处理中、完成和异常状态减少等待焦虑。', 'Use processing, done, and error states to reduce uncertainty.') },
      { stage: dual('分享', 'SHARE'), title: dual('把完成感带出去', 'Take the result outward'), goal: dual('让成果容易被保存和分享。', 'Make the result easy to save and share.'), detail: dual('在结果页保留明确的导出和分享出口。', 'Keep clear export and share actions on the result view.') },
    ],
    scenes: [
      { scene: dual('灵感浏览', 'Inspiration browse'), strategy: dual('大图 + 低干扰元信息', 'Large visuals + quiet metadata'), reason: dual('让用户先建立兴趣，再决定是否深入。', 'Let interest form before asking for a decision.') },
      { scene: dual('工作台创作', 'Workspace making'), strategy: dual('高对比 + 稳定层级', 'High contrast + stable hierarchy'), reason: dual('减少复杂工具带来的认知负担。', 'Reduce cognitive load in a complex tool.') },
      { scene: dual('结果分享', 'Result sharing'), strategy: dual('沉浸预览 + 单一主动作', 'Immersive preview + one primary action'), reason: dual('把注意力集中到成果和下一步。', 'Focus attention on the result and what follows.') },
    ],
    metrics: [
      { value: dual('上线数据', 'Launch data'), label: dual('验证方式', 'Validation'), detail: dual('持续观察用户量与核心路径表现。', 'Observed user growth and core journey performance.') },
      { value: dual('用户反馈', 'User feedback'), label: dual('输入来源', 'Input source'), detail: dual('围绕页面结构、内容层级和核心操作持续迭代。', 'Iterated around structure, hierarchy, and core actions.') },
      { value: dual('核心路径', 'Core journey'), label: dual('追踪对象', 'Tracked object'), detail: dual('重点观察从灵感浏览到创作和分享的连续性。', 'Tracked continuity from inspiration to making and sharing.') },
    ],
    evidence: [
      { before: dual('内容层级和下一步动作需要重排。', 'Content hierarchy and next actions needed restructuring.'), decision: dual('把下一步动作放回内容上下文。', 'Place the next action inside the content context.'), signal: dual('改版产物：浏览、收藏、创作路径被重新串联。', 'Delivery: browse, save, and make were reconnected.') },
      { before: dual('反馈分散在多个状态里。', 'Feedback was scattered across states.'), decision: dual('统一处理中、完成、异常的反馈语言。', 'Unify processing, done, and error feedback.'), signal: dual('落地证据：状态规则进入视觉系统和上线迭代。', 'Evidence: state rules entered the visual system and launch iteration.') },
      { before: dual('结果页缺少明确的后续动作。', 'The result view lacked a clear next action.'), decision: dual('在结果页保留导出与分享出口。', 'Keep export and share actions on the result page.'), signal: dual('落地证据：结果页具备保存、导出和分享出口。', 'Evidence: the result view has save, export, and share paths.') },
    ],
    emotion: [
      { layer: dual('本能层', 'VIS CERAL'), title: dual('先让人想看', 'Make people want to look'), decision: dual('用大图、克制的银灰和明确层级吸引视线。', 'Use large visuals, restrained silver, and clear hierarchy.'), purpose: dual('建立“这是一个可信工具”的第一印象。', 'Create the first impression of a trustworthy tool.') },
      { layer: dual('行为层', 'BEHAVIORAL'), title: dual('再让人敢用', 'Make action feel safe'), decision: dual('每个关键动作都给出即时状态与恢复路径。', 'Give every key action instant feedback and recovery.'), purpose: dual('降低探索成本，让用户敢于继续。', 'Lower the cost of exploration so users continue.') },
      { layer: dual('反思层', 'REFLECTIVE'), title: dual('最后愿意分享', 'Make the result worth sharing'), decision: dual('用完成反馈和清晰结果页强化成就感。', 'Use completion feedback and a clear result view.'), purpose: dual('让用户把一次使用记成一次完成。', 'Turn one session into a sense of accomplishment.') },
    ],
    components: [
      { name: dual('灵感卡片', 'Inspiration card'), state: dual('默认 / 收藏 / 已查看', 'Default / saved / viewed') },
      { name: dual('灵感详情', 'Inspiration detail'), state: dual('浏览 / 继续创作', 'Browse / continue making') },
      { name: dual('内容筛选', 'Content filter'), state: dual('未选 / 已选 / 清空', 'Idle / selected / clear') },
      { name: dual('工作台侧栏', 'Workspace sidebar'), state: dual('收起 / 展开 / 当前项', 'Collapsed / open / current') },
      { name: dual('创作输入', 'Creation input'), state: dual('空 / 聚焦 / 有内容', 'Empty / focused / filled') },
      { name: dual('生成进度', 'Generation progress'), state: dual('等待 / 处理中 / 完成', 'Waiting / processing / done') },
      { name: dual('结果预览', 'Result preview'), state: dual('预览 / 编辑 / 放大', 'Preview / edit / zoom') },
      { name: dual('收藏动作', 'Save action'), state: dual('未收藏 / 已收藏', 'Unsaved / saved') },
      { name: dual('分享出口', 'Share action'), state: dual('复制 / 导出 / 分享', 'Copy / export / share') },
    ],
    states: [
      { label: dual('灵感空态', 'EMPTY INSPIRATION'), note: dual('给出浏览方向，避免首页只剩空白。', 'Offer a browsing direction instead of a blank home.'), tone: 'quiet' },
      { label: dual('生成状态', 'GENERATING'), note: dual('说明系统正在工作，保留等待预期。', 'Show that the system is working and set an expectation.'), tone: 'active' },
      { label: dual('生成异常', 'GENERATION ERROR'), note: dual('保留重试路径，不让一次失败中断创作。', 'Keep a retry path so one failure does not stop making.'), tone: 'danger' },
      { label: dual('分享完成', 'SHARE READY'), note: dual('让成果可以被保存、导出和继续传播。', 'Make the result ready to save, export, and share.'), tone: 'active' },
    ],
    systemSummary: dual('以真实使用路径为骨架，把视觉、组件和反馈状态收敛成一套可持续迭代的产品系统。', 'Use the real journey as the skeleton, then converge visual language, components, and feedback into a system that can keep iterating.'),
    perspective: dual('这次改版让我确认：好的作品集不只展示“做了什么”，还要把上线后的观察、判断和下一轮迭代说清楚。下一步会继续补充路径数据，让设计决策与增长结果形成更紧的证据链。', 'This redesign reinforced that a case study should explain the observation, decisions, and next iteration after launch. The next step is to connect journey data and growth into a tighter evidence chain.'),
  },
  'aojin-ai': {
    problemTitle: dual('流程已经成立，表达还不够准确。', 'The flow worked; the expression did not yet.'),
    problemBody: dual('奥锦装修 AI 的核心任务很集中，真正的问题是视觉层级和状态反馈没有把流程讲清楚。设计以“少改动、强表达”为策略，让用户在每一步都知道输入什么、正在发生什么、下一步做什么。', 'AOJIN AI had a focused task. The real issue was that hierarchy and feedback did not explain the flow clearly. The strategy was fewer changes with stronger expression, so each step explains the input, current state, and next action.'),
    problemPoints: [dual('核心流程短，但关键状态不够可见。', 'The core loop was short, but key states were hard to see.'), dual('组件样式不统一，影响产品完成度。', 'Inconsistent components lowered perceived polish.'), dual('视觉优化需要保持原有使用效率。', 'Visual refinement had to preserve existing efficiency.')],
    hypothesis: dual('把视觉优化落到层级、组件和反馈三件事上，用更少的变化换来更明确的体验。', 'Focus refinement on hierarchy, components, and feedback: fewer changes, a clearer experience.'),
    journey: [
      { stage: dual('发现需求', 'DISCOVER'), title: dual('先理解装修目标', 'Clarify the design goal'), goal: dual('快速进入适合自己的任务。', 'Enter the right task quickly.'), detail: dual('用清晰入口区分不同装修意图。', 'Separate different interior goals with clear entry points.') },
      { stage: dual('选方案', 'CHOOSE'), title: dual('选择输入方式', 'Choose an input mode'), goal: dual('知道该上传什么或描述什么。', 'Know what to upload or describe.'), detail: dual('把输入要求、示例和限制放在同一层级。', 'Keep requirements, examples, and limits together.') },
      { stage: dual('用产品', 'USE'), title: dual('完成一次生成', 'Complete one generation'), goal: dual('不被复杂控制项打断。', 'Avoid interruption by unnecessary controls.'), detail: dual('用单一主操作承接核心生成动作。', 'Use one primary action for the core generation.') },
      { stage: dual('获反馈', 'FEEDBACK'), title: dual('看懂处理中状态', 'Read the processing state'), goal: dual('知道等待是否正常。', 'Know whether waiting is normal.'), detail: dual('把进度、失败原因与重试路径说清楚。', 'Explain progress, failure cause, and retry path.') },
      { stage: dual('分享', 'SHARE'), title: dual('带走装修结果', 'Take the design outward'), goal: dual('预览、保存和沟通都顺手。', 'Preview, save, and discuss easily.'), detail: dual('结果页同时兼顾沉浸预览与下一步动作。', 'Balance immersive preview with the next action.') },
    ],
    scenes: [
      { scene: dual('输入需求', 'Input brief'), strategy: dual('大字号 + 示例引导', 'Large type + examples'), reason: dual('降低第一次描述装修需求的压力。', 'Reduce the pressure of describing a brief.') },
      { scene: dual('生成等待', 'Generation wait'), strategy: dual('进度可见 + 操作锁定', 'Visible progress + locked action'), reason: dual('避免重复提交和状态误解。', 'Prevent duplicate submissions and misread states.') },
      { scene: dual('结果沟通', 'Result review'), strategy: dual('大预览 + 轻量工具', 'Large preview + quiet tools'), reason: dual('让方案成为沟通对象，而不是装饰图。', 'Make the design a conversation object, not decoration.') },
    ],
    metrics: [
      { value: dual('前端视觉', 'Front-end visual'), label: dual('工作范围', 'Work scope'), detail: dual('围绕层级、色彩、组件和细节完成界面优化。', 'Refined hierarchy, color, components, and detail.') },
      { value: dual('AI 闭环', 'AI loop'), label: dual('产品结构', 'Product structure'), detail: dual('从输入需求到生成结果，保持流程短而清晰。', 'Kept the path from brief to generated result short and clear.') },
      { value: dual('状态反馈', 'State feedback'), label: dual('交互重点', 'Interaction focus'), detail: dual('处理中、完成、错误和重试路径进入统一表达。', 'Unified processing, done, error, and retry paths.') },
    ],
    evidence: [
      { before: dual('输入要求需要被更准确地说明。', 'Input requirements needed clearer expression.'), decision: dual('在输入区补充示例、限制和提示。', 'Add examples, limits, and prompts to the input area.'), signal: dual('落地证据：输入页面能解释“上传什么、描述什么”。', 'Evidence: the input view explains what to upload and describe.') },
      { before: dual('生成期间缺少确定反馈。', 'Generation lacked a definite feedback state.'), decision: dual('强化处理中反馈并锁定主按钮。', 'Strengthen processing feedback and lock the primary action.'), signal: dual('落地证据：等待、完成、失败和重试形成一套状态。', 'Evidence: waiting, done, failure, and retry form one state set.') },
      { before: dual('结果页视觉重点不够集中。', 'The result view lacked a clear visual focus.'), decision: dual('以预览为主，收敛保存和沟通动作。', 'Make preview primary and reduce save and discuss actions.'), signal: dual('落地证据：方案成为可预览、可保存、可沟通的结果。', 'Evidence: the design becomes a result to preview, save, and discuss.') },
    ],
    emotion: [
      { layer: dual('本能层', 'VISCERAL'), title: dual('清爽而可信', 'Clear and trustworthy'), decision: dual('用克制的暖色作为提示，不让装饰盖过方案。', 'Use restrained warm accents without covering the design.'), purpose: dual('让用户先相信结果质量。', 'Build trust in the result quality.') },
      { layer: dual('行为层', 'BEHAVIORAL'), title: dual('每一步有回音', 'Every step has an echo'), decision: dual('输入、生成、错误都给出即时反馈。', 'Give immediate feedback for input, generation, and errors.'), purpose: dual('让 AI 的不可见过程变得可理解。', 'Make the invisible AI process understandable.') },
      { layer: dual('反思层', 'REFLECTIVE'), title: dual('方案值得讨论', 'Make the design discussable'), decision: dual('把结果呈现为可保存、可沟通的对象。', 'Present the result as something to save and discuss.'), purpose: dual('让一次生成进入真实装修沟通。', 'Move one generation into real design discussion.') },
    ],
    components: [
      { name: dual('装修需求输入', 'Interior brief input'), state: dual('空 / 聚焦 / 已填写', 'Empty / focused / filled') },
      { name: dual('参考图上传', 'Reference upload'), state: dual('未上传 / 上传中 / 已完成', 'Idle / uploading / done') },
      { name: dual('风格选项', 'Style option'), state: dual('未选 / 已选 / 不可用', 'Idle / selected / unavailable') },
      { name: dual('生成按钮', 'Generate button'), state: dual('可用 / 处理中 / 禁用', 'Ready / processing / disabled') },
      { name: dual('生成进度', 'Generation progress'), state: dual('等待 / 处理中 / 完成', 'Waiting / processing / done') },
      { name: dual('方案卡片', 'Design result card'), state: dual('默认 / 选中 / 展开', 'Default / selected / expanded') },
      { name: dual('结果预览', 'Result preview'), state: dual('预览 / 对比 / 放大', 'Preview / compare / zoom') },
      { name: dual('失败提示', 'Failure notice'), state: dual('解释 / 重试 / 保留输入', 'Explain / retry / preserve input') },
      { name: dual('保存与沟通', 'Save and discuss'), state: dual('保存 / 复制 / 分享', 'Save / copy / share') },
    ],
    states: [
      { label: dual('首次输入', 'FIRST INPUT'), note: dual('用示例和限制帮助用户描述装修需求。', 'Use examples and limits to help describe the brief.'), tone: 'quiet' },
      { label: dual('生成中', 'PROCESSING'), note: dual('锁定重复操作，持续给出进度反馈。', 'Prevent duplicate action while showing progress.'), tone: 'active' },
      { label: dual('生成失败', 'FAILED'), note: dual('说明原因并保留原输入，支持重新生成。', 'Explain the cause, preserve input, and allow retry.'), tone: 'danger' },
      { label: dual('方案完成', 'RESULT READY'), note: dual('突出方案预览，让保存和沟通自然发生。', 'Prioritize preview so saving and discussion follow naturally.'), tone: 'active' },
    ],
    systemSummary: dual('不通过堆叠功能制造复杂度，而是用组件、状态和信息层级把已有闭环表达准确。', 'Rather than adding complexity, make the existing loop precise through components, states, and hierarchy.'),
    perspective: dual('奥锦让我更确定，视觉设计的价值常常来自“少做但做准”。后续会继续用更多真实任务样本验证不同装修场景下的输入和结果沟通。', 'AOJIN reinforced that visual design often gains value by doing less, precisely. More real task samples will help validate input and result review across scenarios.'),
  },
  'qiaxu-ai': {
    problemTitle: dual('业务很复杂，用户只想完成任务。', 'The business was complex; users wanted to finish tasks.'),
    problemBody: dual('恰序 AI 面向 B 端工作流，角色、任务和反馈彼此交织。设计先把业务关系变成可讨论的结构，再把结构拆成工作台、任务流和状态系统，让复杂能力保持可理解。', 'QIA XU AI serves a B2B workflow where roles, tasks, and feedback intersect. I first made the business structure discussable, then translated it into a workspace, task flow, and state system.'),
    problemPoints: [dual('不同角色看到的信息重点不同。', 'Different roles needed different information priorities.'), dual('任务进度与 AI 反馈没有形成连续感。', 'Task progress and AI feedback felt disconnected.'), dual('缺少可供团队复用的视觉和组件规则。', 'The team lacked reusable visual and component rules.')],
    hypothesis: dual('以任务为主线重排信息，把复杂业务拆成“看得懂、做得到、能追踪”的工作台。', 'Reorder information around tasks and turn complex business into a workspace that is understandable, actionable, and trackable.'),
    journey: [
      { stage: dual('发现需求', 'DISCOVER'), title: dual('定位今天要完成的事', 'Find today’s task'), goal: dual('进入与角色相关的工作入口。', 'Enter the role-relevant workspace.'), detail: dual('把任务、状态和优先级放在首屏。', 'Put tasks, status, and priority on the first view.') },
      { stage: dual('选方案', 'CHOOSE'), title: dual('选择处理路径', 'Choose a route'), goal: dual('理解输入、协作和输出关系。', 'Understand input, collaboration, and output.'), detail: dual('用分组和清晰动作减少路径猜测。', 'Use grouping and clear actions to reduce guessing.') },
      { stage: dual('用产品', 'USE'), title: dual('在工作台完成任务', 'Finish in the workspace'), goal: dual('复杂操作仍然保持节奏。', 'Keep momentum through complex operations.'), detail: dual('用固定的侧栏、主区和反馈位承接流程。', 'Use a stable sidebar, main area, and feedback rail.') },
      { stage: dual('获反馈', 'FEEDBACK'), title: dual('追踪 AI 与协作进度', 'Track AI and collaboration'), goal: dual('知道任务走到哪一步。', 'Know where the task stands.'), detail: dual('把生成、审核、异常状态放进同一条时间线。', 'Place generation, review, and error in one timeline.') },
      { stage: dual('分享', 'SHARE'), title: dual('交付可讨论结果', 'Share a discussable result'), goal: dual('让结果能被团队接手。', 'Make the result easy for the team to pick up.'), detail: dual('保留批注、版本和导出，让成果离开个人工作台。', 'Keep notes, versions, and export so work can leave the workspace.') },
    ],
    scenes: [
      { scene: dual('任务总览', 'Task overview'), strategy: dual('信息对齐 + 快速筛选', 'Aligned information + fast filters'), reason: dual('让不同角色先看到与自己有关的事。', 'Let each role see what matters first.') },
      { scene: dual('AI 工作台', 'AI workspace'), strategy: dual('高密度 + 强层级', 'High density + strong hierarchy'), reason: dual('承载复杂输入而不牺牲可读性。', 'Support complex input without losing readability.') },
      { scene: dual('协作交付', 'Team handoff'), strategy: dual('版本可见 + 结果可追踪', 'Visible versions + traceable results'), reason: dual('让交接和复盘有共同依据。', 'Give handoff and review a shared reference.') },
    ],
    metrics: [
      { value: dual('工作台', 'Workspace'), label: dual('核心载体', 'Core surface'), detail: dual('以任务、输入、反馈和结果组织 B 端工作流。', 'Organized the B2B workflow around task, input, feedback, and result.') },
      { value: dual('任务流', 'Task flow'), label: dual('交互主线', 'Interaction spine'), detail: dual('把 AI 处理过程放进可追踪的任务关系中。', 'Placed AI processing inside a traceable task relationship.') },
      { value: dual('组件规则', 'Component rules'), label: dual('团队交付', 'Team delivery'), detail: dual('将组件、视觉规范和关键状态整理为交付基础。', 'Defined components, visual rules, and key states for delivery.') },
    ],
    evidence: [
      { before: dual('工作台信息需要围绕任务重排。', 'Workspace information needed a task-based order.'), decision: dual('将任务、输入和反馈放进稳定的工作区结构。', 'Place task, input, and feedback in a stable workspace structure.'), signal: dual('落地证据：工作台从信息堆叠变成任务入口。', 'Evidence: the workspace becomes a task entry, not an information pile.') },
      { before: dual('AI 处理中像“黑盒”。', 'AI processing felt like a black box.'), decision: dual('补充进度、阶段与异常状态。', 'Add progress, stages, and error states.'), signal: dual('落地证据：输入到反馈的任务流可以被追踪。', 'Evidence: the task flow from input to feedback is traceable.') },
      { before: dual('设计交付依赖口头说明。', 'Delivery relied on verbal explanation.'), decision: dual('把组件、规则和状态写入系统。', 'Put components, rules, and states into the system.'), signal: dual('落地证据：视觉系统支持后续扩展和协作落地。', 'Evidence: the visual system supports scale and team delivery.') },
    ],
    emotion: [
      { layer: dual('本能层', 'VISCERAL'), title: dual('复杂但不吓人', 'Complex, not intimidating'), decision: dual('用明确对比和留白切开高密度信息。', 'Use contrast and whitespace to divide dense information.'), purpose: dual('让用户相信自己能掌控工作台。', 'Make users feel they can control the workspace.') },
      { layer: dual('行为层', 'BEHAVIORAL'), title: dual('操作有连续性', 'Keep action continuous'), decision: dual('固定输入、处理中、反馈的空间关系。', 'Keep input, processing, and feedback spatially consistent.'), purpose: dual('减少在复杂界面中寻找下一步。', 'Reduce searching for the next action.') },
      { layer: dual('反思层', 'REFLECTIVE'), title: dual('团队一起完成', 'Make work feel shared'), decision: dual('在结果中保留版本、批注和交付线索。', 'Keep versions, notes, and handoff cues in the result.'), purpose: dual('让个人产出变成团队资产。', 'Turn personal output into a team asset.') },
    ],
    components: [
      { name: dual('任务导航', 'Task navigation'), state: dual('默认 / 当前项 / 收起', 'Default / current / collapsed') },
      { name: dual('任务列表', 'Task list'), state: dual('待处理 / 处理中 / 已完成', 'To do / processing / done') },
      { name: dual('工作台输入区', 'Workspace input'), state: dual('空 / 编辑 / 提交', 'Empty / editing / submitted') },
      { name: dual('AI 任务卡', 'AI task card'), state: dual('等待 / 运行 / 结果', 'Waiting / running / result') },
      { name: dual('进度时间线', 'Progress timeline'), state: dual('当前 / 已完成 / 异常', 'Current / done / error') },
      { name: dual('结果面板', 'Result panel'), state: dual('预览 / 编辑 / 交付', 'Preview / edit / handoff') },
      { name: dual('版本切换', 'Version switcher'), state: dual('当前 / 历史 / 对比', 'Current / history / compare') },
      { name: dual('批注入口', 'Comment entry'), state: dual('未读 / 已读 / 回复', 'Unread / read / reply') },
      { name: dual('交付操作', 'Handoff action'), state: dual('导出 / 分享 / 归档', 'Export / share / archive') },
    ],
    states: [
      { label: dual('任务空态', 'EMPTY TASKS'), note: dual('说明下一步如何创建或筛选任务。', 'Explain how to create or filter the next task.'), tone: 'quiet' },
      { label: dual('AI 处理中', 'AI RUNNING'), note: dual('显示阶段和进度，保持工作台连续。', 'Show stage and progress to maintain continuity.'), tone: 'active' },
      { label: dual('任务异常', 'TASK ERROR'), note: dual('保留输入和上下文，支持重试或转交。', 'Preserve context and support retry or handoff.'), tone: 'danger' },
      { label: dual('交付完成', 'HANDOFF READY'), note: dual('让版本、批注和导出动作可被接手。', 'Make version, comments, and export ready for handoff.'), tone: 'active' },
    ],
    systemSummary: dual('用原子到模板的五层结构拆解复杂工作台，让设计语言可以被团队复用和持续扩展。', 'Break the complex workspace into five layers from atoms to templates so the language can scale with the team.'),
    perspective: dual('恰序让我看到，系统化设计不只是整理组件，更是把业务判断变成团队可以共同使用的语言。后续会继续补充角色权限和更多异常路径。', 'QIA XU showed that system design is more than organizing components: it turns business judgment into a shared team language. The next step is to extend role permissions and exception paths.'),
  },
  wowo: {
    problemTitle: dual('需求还没有答案，设计要先建立方向。', 'The brief had no answer yet; design had to create direction.'),
    problemBody: dual('窝喔从模糊的项目想法开始，设计首先要帮助团队回答“为谁做、为什么做、长什么样”。我把定位、视觉气质、产品结构和展示物料放进同一个叙事，再推进到可用的 C 端体验。', 'WOWO started as an unclear idea. The first design task was helping the team answer who it was for, why it mattered, and what it should feel like. Positioning, visual character, product structure, and presentation became one story.'),
    problemPoints: [dual('目标用户与产品定位还在探索。', 'Audience and positioning were still being explored.'), dual('品牌视觉和产品界面缺少共同语言。', 'Brand visuals and product screens lacked a shared language.'), dual('从概念到交付需要一条完整推进路径。', 'The project needed a path from concept to delivery.')],
    hypothesis: dual('先用场景和视觉建立共识，再把共识转成可用的产品结构与交付规范。', 'Build alignment through scenes and visual character, then turn that alignment into a usable product structure and delivery rules.'),
    journey: [
      { stage: dual('发现需求', 'DISCOVER'), title: dual('找到值得被记住的瞬间', 'Find the memorable moment'), goal: dual('让用户知道产品为何与自己有关。', 'Show why the product matters to them.'), detail: dual('从真实生活场景提炼视觉和内容入口。', 'Start from real-life scenes for visual and content entry.') },
      { stage: dual('选方案', 'CHOOSE'), title: dual('建立产品选择理由', 'Build a reason to choose'), goal: dual('让定位和价值可以被快速比较。', 'Make positioning easy to compare.'), detail: dual('用清晰的信息层级承接探索和决策。', 'Use hierarchy to carry exploration into decision.') },
      { stage: dual('用产品', 'USE'), title: dual('让品牌进入日常操作', 'Bring the brand into daily use'), goal: dual('视觉气质不牺牲使用效率。', 'Keep character without losing usability.'), detail: dual('把品牌元素收敛成可复用的界面组件。', 'Converge brand elements into reusable interface components.') },
      { stage: dual('获反馈', 'FEEDBACK'), title: dual('用真实反馈修正方向', 'Use feedback to correct direction'), goal: dual('及时发现理解偏差。', 'Catch misunderstanding early.'), detail: dual('通过走查、测试和沟通复盘设计判断。', 'Review decisions through walkthroughs, tests, and discussion.') },
      { stage: dual('分享', 'SHARE'), title: dual('让项目被完整讲述', 'Let the project tell its story'), goal: dual('产品、品牌和展示可以一起被传播。', 'Let product, brand, and presentation travel together.'), detail: dual('统一展示模板、动效和输出物料。', 'Align presentation templates, motion, and deliverables.') },
    ],
    scenes: [
      { scene: dual('品牌初见', 'Brand first look'), strategy: dual('强识别 + 低信息噪音', 'Strong identity + low noise'), reason: dual('让用户先记住气质，再理解功能。', 'Let character land before functionality.') },
      { scene: dual('日常使用', 'Daily use'), strategy: dual('轻量反馈 + 易读内容', 'Light feedback + readable content'), reason: dual('把品牌感藏进可持续使用的细节。', 'Put the brand in details that support daily use.') },
      { scene: dual('对外展示', 'External presentation'), strategy: dual('统一模板 + 场景 Mockup', 'Unified templates + scene mockups'), reason: dual('让产品价值在屏幕之外也成立。', 'Make the value hold beyond the screen.') },
    ],
    metrics: [
      { value: dual('产品定位', 'Positioning'), label: dual('前期工作', 'Early work'), detail: dual('从目标、用户和项目方向建立共同判断。', 'Aligned goals, audience, and project direction.') },
      { value: dual('品牌视觉', 'Brand visual'), label: dual('核心产出', 'Core output'), detail: dual('建立品牌气质、产品界面和展示语言。', 'Defined brand character, interface, and presentation language.') },
      { value: dual('全流程', 'End to end'), label: dual('交付范围', 'Delivery scope'), detail: dual('从需求澄清推进到界面、物料和项目落地。', 'Moved from brief clarification to interface, materials, and delivery.') },
    ],
    evidence: [
      { before: dual('项目方向和目标还不清晰。', 'Direction and goals were not yet clear.'), decision: dual('先从目标、用户和定位澄清问题。', 'Clarify the questions through goals, audience, and positioning.'), signal: dual('落地证据：形成可讨论、可执行的产品方向。', 'Evidence: an actionable product direction emerged.') },
      { before: dual('品牌视觉与产品界面各自表达。', 'Brand and product spoke separately.'), decision: dual('把品牌气质转译成界面和展示规则。', 'Translate brand character into interface and presentation rules.'), signal: dual('落地证据：品牌、界面和物料共享一套语言。', 'Evidence: brand, interface, and materials share one language.') },
      { before: dual('展示物料依赖临时制作。', 'Presentation materials were made ad hoc.'), decision: dual('建立可替换内容的展示模板。', 'Create presentation templates with replaceable content.'), signal: dual('落地证据：产品价值可以被完整呈现和传播。', 'Evidence: the product value can be presented and shared as a whole.') },
    ],
    emotion: [
      { layer: dual('本能层', 'VISCERAL'), title: dual('先被气质吸引', 'Attract with character'), decision: dual('用高辨识度色彩、字形和构图形成第一眼记忆。', 'Use distinctive color, type, and composition for first-glance memory.'), purpose: dual('让项目从同类产品中被看见。', 'Help the project stand apart.') },
      { layer: dual('行为层', 'BEHAVIORAL'), title: dual('使用仍然顺手', 'Keep use effortless'), decision: dual('把装饰收敛到不打断任务的尺度。', 'Keep decoration within a scale that does not interrupt tasks.'), purpose: dual('让喜欢视觉的人也能顺利完成操作。', 'Let people who love the look still finish tasks easily.') },
      { layer: dual('反思层', 'REFLECTIVE'), title: dual('形成属于自己的表达', 'Build a sense of ownership'), decision: dual('用完成反馈和可分享结果形成记忆点。', 'Use completion feedback and shareable results as memory points.'), purpose: dual('让用户愿意把产品带进自己的生活。', 'Make users want to bring the product into their lives.') },
    ],
    components: [
      { name: dual('品牌标识', 'Brand mark'), state: dual('主标 / 反白 / 小尺寸', 'Primary / inverse / small') },
      { name: dual('品牌字形', 'Brand type'), state: dual('标题 / 正文 / 辅助', 'Display / body / support') },
      { name: dual('主色与辅助色', 'Color palette'), state: dual('品牌 / 背景 / 强调', 'Brand / background / accent') },
      { name: dual('首屏模块', 'Hero module'), state: dual('品牌初见 / 行动入口', 'First look / entry action') },
      { name: dual('内容卡片', 'Content card'), state: dual('默认 / 聚焦 / 点击', 'Default / focused / clicked') },
      { name: dual('产品导航', 'Product navigation'), state: dual('默认 / 当前项 / 移动端', 'Default / current / mobile') },
      { name: dual('展示模板', 'Presentation template'), state: dual('产品 / 场景 / 物料', 'Product / scene / material') },
      { name: dual('场景 Mockup', 'Scene mockup'), state: dual('屏幕 / 空间 / 对外', 'Screen / space / external') },
      { name: dual('交付清单', 'Delivery checklist'), state: dual('设计 / 标注 / 走查', 'Design / specs / QA') },
    ],
    states: [
      { label: dual('品牌首见', 'FIRST LOOK'), note: dual('先建立气质和定位，再进入产品内容。', 'Establish character and positioning before product detail.'), tone: 'quiet' },
      { label: dual('日常使用', 'DAILY USE'), note: dual('把品牌感收敛到不打断操作的细节。', 'Keep brand character in details that do not interrupt use.'), tone: 'active' },
      { label: dual('物料变体', 'MATERIAL VARIANT'), note: dual('适配产品截图、场景 Mockup 和展示输出。', 'Adapt to product shots, scene mockups, and presentation output.'), tone: 'active' },
      { label: dual('项目交付', 'DELIVERY READY'), note: dual('让设计、标注、走查和物料形成完整闭环。', 'Connect design, specs, QA, and materials into delivery.'), tone: 'active' },
    ],
    systemSummary: dual('把探索阶段的视觉判断沉淀为一套可以支撑品牌、产品和展示物料的统一语言。', 'Turn exploratory visual decisions into one language for brand, product, and presentation.'),
    perspective: dual('窝喔让我学会在答案不清晰时先建立问题和共识，再推进设计。后续会继续补充品牌资产的可编辑模板，降低后续内容生产成本。', 'WOWO taught me to build the questions and alignment first when the answer is unclear. Next, I will extend editable brand templates to reduce future content production cost.'),
  },
}

const LanguageContext = createContext<{ language: Language; toggleLanguage: () => void }>({ language: 'zh', toggleLanguage: () => undefined })

function useLanguage() {
  return useContext(LanguageContext)
}

function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()
  return (
    <button className="language-toggle" type="button" onClick={toggleLanguage} aria-label={language === 'zh' ? '切换为英文' : 'Switch to Chinese'}>
      <Languages size={16} strokeWidth={1.5} />
      <span className={language === 'zh' ? 'is-active' : ''}>中</span>
      <span className="language-toggle-slash">/</span>
      <span className={language === 'en' ? 'is-active' : ''}>EN</span>
    </button>
  )
}

function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title}｜陈兴 UI设计师`
  }, [title])
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.style.setProperty('--reveal-delay', `${delay}ms`)
          node.classList.add('is-visible')
          observer.unobserve(node)
        }
      },
      { threshold: 0.08 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [delay])
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

function SignalMark({ className = '' }: { className?: string }) {
  return <span className={`signal-mark ${className}`} aria-hidden="true"><span /></span>
}

function SiteLoader() {
  const loaderPlaybackDuration = 4
  const loaderExitDuration = 1450
  const videoRef = useRef<HTMLVideoElement>(null)
  const fluidCanvasRef = useRef<HTMLCanvasElement>(null)
  const loaderHoldRef = useRef(false)
  const loaderHoldWaitersRef = useRef<Array<() => void>>([])
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'exiting' | 'done'>('loading')

  const enterNow = () => {
    document.body.classList.remove('is-loading')
    window.dispatchEvent(new Event('portfolio-loader-complete'))
    setPhase('done')
  }

  useEffect(() => {
    const canvas = fluidCanvasRef.current
    const gl = canvas?.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: false })
    if (!canvas || !gl) return

    const vertexSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `
    const fragmentSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      varying vec2 v_uv;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
      }

      float fbm(vec2 p) {
        float value = 0.0;
        value += noise(p) * 0.5;
        value += noise(p * 2.03) * 0.25;
        value += noise(p * 4.07) * 0.125;
        return value;
      }

      float surfaceHeight(vec2 uv, float time, vec2 aspect) {
        vec2 warp = vec2(
          fbm(uv * 2.2 + vec2(time * 0.018, -time * 0.012)),
          fbm(uv * 2.2 + vec2(-time * 0.014, time * 0.02))
        ) - 0.5;
        vec2 fluidUv = uv + warp * 0.24;
        float largeBlobs = fbm(fluidUv * 2.1 + vec2(time * 0.014, -time * 0.01));
        float mediumBlobs = fbm(fluidUv * 5.2 - vec2(time * 0.018, time * 0.013));
        float smallBlobs = fbm(fluidUv * 10.0 + vec2(time * 0.028, -time * 0.02));
        return largeBlobs * 0.13 + mediumBlobs * 0.055 + smallBlobs * 0.02;
      }

      void main() {
        vec2 uv = v_uv;
        vec2 aspect = vec2(u_resolution.x / max(u_resolution.y, 1.0), 1.0);
        float time = u_time * 0.001;
        float epsilon = 0.0025;
        float height = surfaceHeight(uv, time, aspect);
        float heightX = surfaceHeight(uv + vec2(epsilon, 0.0), time, aspect);
        float heightY = surfaceHeight(uv + vec2(0.0, epsilon), time, aspect);
        vec3 normal = normalize(vec3((height - heightX) * 85.0, (height - heightY) * 85.0, 1.0));
        vec2 lightUv = vec2(0.34 + sin(time * 0.08) * 0.18, 0.3 + cos(time * 0.065) * 0.16);
        vec3 lightDirection = normalize(vec3((lightUv.x - uv.x) * aspect.x, lightUv.y - uv.y, 0.72));
        vec2 ambientLightUv = vec2(0.76 + sin(time * 0.05) * 0.14, 0.7 + cos(time * 0.06) * 0.12);
        vec3 ambientLightDirection = normalize(vec3((ambientLightUv.x - uv.x) * aspect.x, ambientLightUv.y - uv.y, 0.9));
        vec3 viewDirection = vec3(0.0, 0.0, 1.0);
        float diffuse = max(dot(normal, lightDirection), 0.0);
        float specular = pow(max(dot(reflect(-lightDirection, normal), viewDirection), 0.0), 24.0);
        float ambientSpecular = pow(max(dot(reflect(-ambientLightDirection, normal), viewDirection), 0.0), 16.0);
        float fresnel = pow(1.0 - max(dot(normal, viewDirection), 0.0), 2.0);
        float blobMask = smoothstep(0.035, 0.078, height);
        float alpha = clamp(blobMask * 0.16 + diffuse * 0.18 + specular * 0.42 + ambientSpecular * 0.24 + fresnel * 0.14, 0.0, 0.82);
        vec3 waterBase = vec3(0.035, 0.055, 0.06);
        vec3 waterHighlight = vec3(0.98, 1.0, 1.0);
        vec3 color = mix(waterBase, waterHighlight, clamp(specular * 1.1 + ambientSpecular * 0.45 + fresnel, 0.0, 1.0));
        gl_FragColor = vec4(color, alpha);
      }
    `

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type)
      if (!shader) throw new Error('Unable to create loader shader')
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? 'Unable to compile loader shader')
      return shader
    }

    let program: WebGLProgram
    try {
      const vertexShader = compileShader(gl.VERTEX_SHADER, vertexSource)
      const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentSource)
      const nextProgram = gl.createProgram()
      if (!nextProgram) throw new Error('Unable to create loader program')
      gl.attachShader(nextProgram, vertexShader)
      gl.attachShader(nextProgram, fragmentShader)
      gl.linkProgram(nextProgram)
      if (!gl.getProgramParameter(nextProgram, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(nextProgram) ?? 'Unable to link loader program')
      program = nextProgram
    } catch {
      return
    }

    const positionBuffer = gl.createBuffer()
    if (!positionBuffer) return
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    gl.useProgram(program)
    const positionLocation = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
    const timeLocation = gl.getUniformLocation(program, 'u_time')
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.clearColor(0, 0, 0, 0)

    let frame = 0
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    const draw = (time: number) => {
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
      gl.uniform1f(timeLocation, time)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      frame = window.requestAnimationFrame(draw)
    }
    resize()
    window.addEventListener('resize', resize)
    frame = window.requestAnimationFrame(draw)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      gl.deleteBuffer(positionBuffer)
      gl.deleteProgram(program)
    }
  }, [])

  useEffect(() => {
    document.body.classList.add('is-loading')
    let cancelled = false
    let frame = 0
    let current = 0
    let assetTarget = 5
    let videoProgress = 0
    let videoHasDuration = false
    let videoFinished = false
    let assetsFinished = false
    const startedAt = performance.now()
    const minimumDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 350 : loaderPlaybackDuration * 1000

    const wait = (duration: number) => new Promise<void>((resolve) => window.setTimeout(resolve, duration))
    const holdTargets = Array.from(document.querySelectorAll<HTMLElement>('.site-loader-contact, .site-loader-directory'))
    const holdLoader = () => { loaderHoldRef.current = true }
    const releaseLoader = () => {
      loaderHoldRef.current = false
      const waiters = loaderHoldWaitersRef.current.splice(0)
      waiters.forEach((resolve) => resolve())
    }
    const waitForLoaderResume = () => loaderHoldRef.current ? new Promise<void>((resolve) => loaderHoldWaitersRef.current.push(resolve)) : Promise.resolve()
    holdTargets.forEach((target) => {
      target.addEventListener('mouseenter', holdLoader)
      target.addEventListener('mouseleave', releaseLoader)
      target.addEventListener('focusin', holdLoader)
      target.addEventListener('focusout', releaseLoader)
    })
    const withTimeout = (promise: Promise<unknown>, duration = 4800) => Promise.race([promise, wait(duration)])
    const report = (weight: number) => { assetTarget = Math.min(100, assetTarget + weight) }
    const waitForMedia = (media: HTMLMediaElement | null) => new Promise<void>((resolve) => {
      if (!media || media.readyState >= 2) { resolve(); return }
      const finish = () => {
        media.removeEventListener('loadeddata', finish)
        media.removeEventListener('canplay', finish)
        media.removeEventListener('error', finish)
        resolve()
      }
      media.addEventListener('loadeddata', finish, { once: true })
      media.addEventListener('canplay', finish, { once: true })
      media.addEventListener('error', finish, { once: true })
    })
    const loadImage = (src: string) => new Promise<void>((resolve) => {
      const image = new Image()
      const finish = () => resolve()
      image.onload = finish
      image.onerror = finish
      image.src = src
      if (image.complete) finish()
    })

    const renderProgress = () => {
      const elapsedProgress = minimumDuration > 1000 ? Math.min(99, ((performance.now() - startedAt) / minimumDuration) * 100) : 99
      const desired = assetsFinished && videoFinished ? 100 : Math.max(elapsedProgress, videoHasDuration ? videoProgress : Math.min(95, assetTarget))
      current = Math.max(current, desired)
      setProgress(Math.min(100, Math.round(current)))
      frame = window.requestAnimationFrame(renderProgress)
    }
    frame = window.requestAnimationFrame(renderProgress)

    const assets = [
      '/media/hero-cover-poster.jpg',
      '/media/about-portrait-v2.png',
      '/media/bilus-cover.png',
      '/media/aojin-cover.png',
      '/media/qiaxu-cover.png',
      '/media/wowo-cover.png',
    ]
    const fontTask = withTimeout(document.fonts.ready).finally(() => report(15))
    const loaderVideoTask = new Promise<void>((resolve) => {
      const video = videoRef.current
      if (!video) { videoFinished = true; resolve(); return }
      let finished = false
      let fallbackTimer = 0
      const updateVideoProgress = () => {
        if (Number.isFinite(video.duration) && video.duration > 0) {
          videoHasDuration = true
          const targetDuration = Math.min(loaderPlaybackDuration, video.duration)
          videoProgress = Math.min(99, (video.currentTime / targetDuration) * 100)
          if (video.currentTime >= targetDuration - 0.04) finish()
        }
      }
      const finish = () => {
        if (finished) return
        finished = true
        window.clearTimeout(fallbackTimer)
        const targetDuration = Number.isFinite(video.duration) && video.duration > 0 ? Math.min(loaderPlaybackDuration, video.duration) : loaderPlaybackDuration
        if (Number.isFinite(video.duration) && video.duration > targetDuration) video.currentTime = targetDuration
        video.pause()
        videoProgress = 100
        videoFinished = true
        video.removeEventListener('timeupdate', updateVideoProgress)
        video.removeEventListener('ended', finish)
        video.removeEventListener('error', finish)
        resolve()
      }
      video.addEventListener('timeupdate', updateVideoProgress)
      video.addEventListener('ended', finish, { once: true })
      video.addEventListener('error', finish, { once: true })
      fallbackTimer = window.setTimeout(finish, loaderPlaybackDuration * 1000)
      const start = () => {
        updateVideoProgress()
        video.play().catch(() => undefined)
      }
      if (video.readyState >= 1) start()
      else video.addEventListener('loadedmetadata', start, { once: true })
    }).finally(() => report(20))
    const heroVideoTask = withTimeout(waitForMedia(document.querySelector<HTMLVideoElement>('.hero-video'))).finally(() => report(20))
    const imageTask = withTimeout(Promise.all(assets.map(loadImage))).finally(() => report(30))
    const windowTask = withTimeout(document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise<void>((resolve) => window.addEventListener('load', () => resolve(), { once: true }))).finally(() => report(10))
    const assetTasks = [fontTask, heroVideoTask, imageTask, windowTask]

    Promise.allSettled(assetTasks).then(() => { assetsFinished = true })
    Promise.allSettled([...assetTasks, loaderVideoTask]).then(async () => {
      const elapsed = performance.now() - startedAt
      if (elapsed < minimumDuration) await wait(minimumDuration - elapsed)
      await waitForLoaderResume()
      if (cancelled) return
      current = 100
      setProgress(100)
      setPhase('exiting')
      window.dispatchEvent(new Event('portfolio-loader-complete'))
      await wait(loaderExitDuration)
      if (cancelled) return
      document.body.classList.remove('is-loading')
      setPhase('done')
    })

    return () => {
      cancelled = true
      window.cancelAnimationFrame(frame)
      holdTargets.forEach((target) => {
        target.removeEventListener('mouseenter', holdLoader)
        target.removeEventListener('mouseleave', releaseLoader)
        target.removeEventListener('focusin', holdLoader)
        target.removeEventListener('focusout', releaseLoader)
      })
      loaderHoldWaitersRef.current.splice(0).forEach((resolve) => resolve())
      document.body.classList.remove('is-loading')
    }
  }, [loaderExitDuration, loaderPlaybackDuration])

  if (phase === 'done') return null
  return (
    <div className={`site-loader ${phase === 'exiting' ? 'is-exiting' : ''}`} role="status" aria-live="polite" aria-label="作品集加载中">
      <svg className="site-loader-filter-defs" aria-hidden="true" focusable="false"><defs><filter id="site-loader-water-filter" x="-20%" y="-35%" width="140%" height="170%"><feTurbulence type="fractalNoise" baseFrequency=".008 .032" numOctaves="2" seed="7" result="water-noise"><animate attributeName="baseFrequency" dur="15s" values=".008 .032;.015 .048;.008 .032" repeatCount="indefinite" /></feTurbulence><feDisplacementMap in="SourceGraphic" in2="water-noise" scale="54" xChannelSelector="R" yChannelSelector="B" /></filter></defs></svg>
      <canvas ref={fluidCanvasRef} className="site-loader-fluid-canvas" aria-hidden="true" />
      <div className="site-loader-word" aria-hidden="true">
        <div className="site-loader-kicker">CHEN XING UI DESIGN</div>
        <div className="site-loader-portfolio site-loader-portfolio-base">PORTFOLIO</div>
        <div className="site-loader-portfolio site-loader-portfolio-water">PORTFOLIO</div>
        <div className="site-loader-subtitle">个人作品集</div>
      </div>
      <div className="site-loader-contact" role="button" tabIndex={0} aria-label="联系我，悬停查看微信二维码">
        <span className="site-loader-contact-trigger">联系我</span>
        <WechatQr heading="扫一扫添加我" prompt="微信 / xx030428" />
      </div>
      <div className="site-loader-meta" aria-hidden="true">
        <span className="site-loader-meta-top">陈兴 / CHEN XING / 2026</span>
        <span className="site-loader-meta-right">SELECTED WORK<br />04 PROJECTS</span>
      </div>
      <button className="site-loader-enter" type="button" onClick={enterNow}>立即进入 <ArrowUpRight size={14} strokeWidth={1.8} /></button>
      <nav className="site-loader-directory" aria-label="Portfolio navigation">
        <Link onClick={enterNow} to="/"><span className="site-loader-directory-number">01</span><span className="site-loader-directory-copy"><strong>首页</strong></span></Link>
        <Link onClick={enterNow} to="/work"><span className="site-loader-directory-number">02</span><span className="site-loader-directory-copy"><strong>作品</strong></span></Link>
        <Link onClick={enterNow} to="/about"><span className="site-loader-directory-number">03</span><span className="site-loader-directory-copy"><strong>关于我</strong></span></Link>
        <Link onClick={enterNow} to="/contact"><span className="site-loader-directory-number">04</span><span className="site-loader-directory-copy"><strong>联系</strong></span></Link>
        <Link onClick={enterNow} to="/work"><span className="site-loader-directory-number">05</span><span className="site-loader-directory-copy"><strong>项目</strong></span></Link>
      </nav>
    </div>
  )
}

function IntroVisualSection() {
  const [revealed, setRevealed] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    let frame = 0
    let hasRevealed = false
    const update = () => {
      const rect = node.getBoundingClientRect()
      const scrollDistance = Math.max(1, node.offsetHeight - window.innerHeight)
      const progress = Math.min(1, Math.max(0, -rect.top / scrollDistance))
      const copyOffset = 16 - progress * 12
      // Keep the profile card readable for a generous part of the pinned portrait.
      const copyReveal = Math.min(1, Math.max(0, (progress - 0.16) / 0.18))
      const copyOpacity = copyReveal
      const titleOpacity = 1
      node.style.setProperty('--about-copy-y', `${copyOffset}vh`)
      node.style.setProperty('--about-copy-opacity', `${copyOpacity}`)
      node.style.setProperty('--about-title-opacity', `${titleOpacity}`)
      node.style.setProperty('--about-title-y', `${progress * 10}vh`)
      node.style.setProperty('--about-image-blur', `${1.1 + progress * 2.2}px`)
      node.style.setProperty('--about-mask-strength', `${0.84 + progress * 0.14}`)
      if (!hasRevealed && progress > 0.44) {
        hasRevealed = true
        setRevealed(true)
      }
    }
    const requestUpdate = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section ref={sectionRef} className={`intro-visual-section ${revealed ? 'is-about-revealed' : ''}`} aria-label="关于陈兴的视觉介绍">
      <div className="intro-visual-frame">
        <img className="intro-visual-image" src="/media/about-portrait-v2.png" alt="" loading="eager" decoding="async" />
        <div className="intro-visual-mask" aria-hidden="true" />
        <div className="intro-visual-overlay" aria-hidden="true" />
        <div className="intro-visual-content page-padding">
          <span className="intro-visual-index">02 / ABOUT</span>
          <div className="intro-about-title" aria-hidden="true">ABOUT ME</div>
          <div className="intro-head-zone" aria-hidden="true">
            <span className="intro-head-ring" aria-hidden="true" />
          </div>
          <div id="intro-head-info" className="intro-head-info" aria-hidden={!revealed}>
            <span className="intro-head-info-kicker">ABOUT CHEN XING</span>
            <strong>UI DESIGNER / AI PRODUCT LEAD</strong>
            <div className="intro-profile-list" aria-label="个人信息">
              <div className="intro-profile-line"><span>姓名 / NAME</span><strong>陈兴 / CHEN XING</strong></div>
              <div className="intro-profile-line"><span>学历 / EDUCATION</span><strong>本科 / BACHELOR'S DEGREE</strong></div>
              <div className="intro-profile-line"><span>专业 / MAJOR</span><strong>视觉传达设计 / VISUAL COMMUNICATION DESIGN</strong></div>
              <div className="intro-profile-line"><span>期望薪资 / EXPECTATION</span><strong>面议 / NEGOTIABLE</strong></div>
              <div className="intro-profile-line"><span>到岗时间 / START DATE</span><strong>一个月以内 / WITHIN ONE MONTH</strong></div>
              <div className="intro-profile-line"><span>现居地 / BASE</span><strong>深圳 / SHENZHEN</strong></div>
            </div>
            <div className="intro-info-footer">
              <p>5年 UI 设计经验，专注 B 端 AI 产品、复杂工作台、组件系统与产品落地。</p>
              <div className="intro-visual-meta" aria-hidden="true">
                <span>VISUAL STATEMENT</span>
                <strong>PRODUCT / SYSTEM / MOTION</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SiteHeader() {
  const location = useLocation()
  const { language } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [projectMenuOpen, setProjectMenuOpen] = useState(false)

  useEffect(() => setMenuOpen(false), [location.pathname])
  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [menuOpen])

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand-lockup" aria-label={localized(language, '返回首页', 'Back to home')}>
          <span className="brand-name">{localized(language, '陈兴', 'CHEN XING')}<span> / {localized(language, '作品集', 'Portfolio')}</span></span>
        </Link>

        <nav className="desktop-nav" aria-label={localized(language, '主导航', 'Primary navigation')}>
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className={`nav-link ${location.pathname === item.to ? 'is-active' : ''}`}>
              <span>{language === 'en' ? item.en : item.label}</span>
              {language === 'en' && <span className="nav-link-en">{item.label}</span>}
            </Link>
          ))}
          <div className="project-nav" onMouseEnter={() => setProjectMenuOpen(true)} onMouseLeave={() => setProjectMenuOpen(false)}>
            <button className={`nav-link project-nav-trigger ${location.pathname.startsWith('/work/') ? 'is-active' : ''}`} onFocus={() => setProjectMenuOpen(true)} onBlur={() => setProjectMenuOpen(false)} aria-expanded={projectMenuOpen}>
              <span>{language === 'en' ? 'Projects' : '项目'}</span><ArrowDown size={13} />
            </button>
            {projectMenuOpen && (
              <div className="project-dropdown">
                {projects.map((project) => <Link key={project.slug} to={`/work/${project.slug}`}>{project.number} <span>{language === 'en' ? project.titleEn : project.title}</span></Link>)}
              </div>
            )}
          </div>
        </nav>

        <div className="header-actions">
          <LanguageToggle />
          <button className="menu-toggle" aria-label={menuOpen ? localized(language, '关闭导航', 'Close navigation') : localized(language, '打开导航', 'Open navigation')} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-top"><span>{localized(language, '导航', 'Navigation')}</span><span>01—05</span></div>
          {navItems.map((item, index) => <Link key={item.to} to={item.to} className={location.pathname === item.to ? 'is-active' : ''}><span>0{index + 1}</span>{language === 'en' ? item.en : item.label}<ArrowUpRight size={16} /></Link>)}
          <div className="mobile-menu-projects">
            <span className="mobile-menu-label">{localized(language, '项目', 'PROJECTS')}</span>
            {projects.map((project) => <Link key={project.slug} to={`/work/${project.slug}`}><span>{project.number}</span>{language === 'en' ? project.titleEn : project.title}<ArrowUpRight size={15} /></Link>)}
          </div>
          <a className="mobile-menu-resume" href={RESUME_URL} download><Download size={16} />{localized(language, '下载简历', 'Download resume')}</a>
        </div>
      )}
    </header>
  )
}

function SiteFooter() {
  const { language } = useLanguage()
  return (
    <footer className="site-footer">
      <SignalMark />
      <div className="footer-main">
        <div>
          <span className="eyebrow">OPEN FOR DESIGN WORK</span>
          <h2>MAKE COMPLEX<br /><em>PRODUCTS CLEAR.</em></h2>
        </div>
        <div className="footer-actions">
          <Link className="button button-primary" to="/contact">{localized(language, '联系我', 'Contact me')} <ArrowUpRight size={17} /></Link>
          <a className="button button-glass" href={RESUME_URL} download><Download size={16} />{localized(language, '下载简历', 'Download resume')}</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 CHEN XING</span>
        <span>{localized(language, 'UI 设计 / AI 产品 / 深圳', 'UI DESIGN / AI PRODUCT / SHENZHEN')}</span>
        <div className="footer-links"><a href="tel:17363679491">173 6367 9491</a><a href="mailto:3068332110@qq.com">3068332110@qq.com</a></div>
      </div>
    </footer>
  )
}

function ButtonLink({ to, children, variant = 'primary', external = false }: { to: string; children: React.ReactNode; variant?: 'primary' | 'glass' | 'text'; external?: boolean }) {
  const className = `button button-${variant}`
  if (external) return <a className={className} href={to} target="_blank" rel="noreferrer">{children}<ExternalLink size={16} /></a>
  return <Link className={className} to={to}>{children}<ArrowUpRight size={16} /></Link>
}

function VideoPanel({ src, label, poster, cover, compact = false }: { src: string; label: string; poster?: string; cover?: string; compact?: boolean }) {
  const panelRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [active, setActive] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (compact) return
    const node = panelRef.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(true)
        observer.disconnect()
      }
    }, { rootMargin: '280px 0px' })
    observer.observe(node)
    return () => observer.disconnect()
  }, [compact])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !compact || !hovered || !active) return
    video.play().catch(() => undefined)
  }, [active, compact, hovered])

  function handleMouseEnter() {
    if (!compact) return
    setActive(true)
    setHovered(true)
  }

  function handleMouseLeave() {
    if (!compact) return
    const video = videoRef.current
    video?.pause()
    if (video) video.currentTime = 0
    setHovered(false)
  }

  return (
    <div ref={panelRef} className={`video-panel ${compact ? 'is-compact is-hover-video' : ''} ${hovered ? 'is-playing' : ''}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {compact && <img className="video-cover" src={cover ?? poster} alt="" loading="lazy" decoding="async" />}
      <video ref={videoRef} src={active ? src : undefined} poster={poster} muted loop playsInline controls={!compact} preload={active ? 'metadata' : 'none'} aria-label={label} />
      <div className="video-panel-bar"><span><span className="video-dot" />{label}</span><Play size={15} /></div>
    </div>
  )
}

function ProjectVisual({ project, detail = false }: { project: Project; detail?: boolean }) {
  const { language } = useLanguage()
  if (project.video) return <VideoPanel src={project.video} poster={project.poster} cover={project.cover} label={localized(language, project.videoLabel ?? `${project.title} 项目演示片段`, project.videoLabelEn ?? `${project.titleEn} product demo`)} compact={!detail} />
  if (!detail && project.cover) return <div className="video-panel is-compact static-cover"><img className="video-cover" src={project.cover} alt="" loading="lazy" decoding="async" /><div className="video-panel-bar"><span><span className="video-dot" />{localized(language, `${project.title} 项目封面`, `${project.titleEn} project cover`)}</span></div></div>
  if (project.slug === 'bilus-3' && detail) return <div className="bilus-detail-media"><img src="/media/bilus-cover.png" alt={localized(language, '毕鲁斯 3.0 产品展示图', 'BILUS 3.0 product showcase')} loading="eager" decoding="async" /></div>
  if (project.slug === 'bilus-3') {
    return (
      <div className={`bilus-visual ${detail ? 'is-detail' : ''}`}>
        <div className="bilus-app-shell">
          <div className="bilus-sidebar">
            <strong>Bilus</strong><span /><span /><span /><span />
          </div>
          <div className="bilus-workspace">
            <div className="bilus-toolbar"><i /><i /><i /><b /></div>
            <div className="bilus-stage">
              <div className="bilus-stage-copy"><small>{localized(language, '灵感 03', 'INSPIRATION 03')}</small><strong>{localized(language, <>灵感与创作，<br />在同一条工作流里。</>, <>Ideas and making,<br />in one clear workflow.</>)}</strong><span /></div>
              <div className="bilus-preview bilus-preview-a" /><div className="bilus-preview bilus-preview-b" /><div className="bilus-preview bilus-preview-c" />
            </div>
          </div>
        </div>
        <div className="project-visual-caption"><span>{localized(language, '工具 / 工作台 / AI', 'TOOL / WORKBENCH / AI')}</span><strong>{localized(language, '毕鲁斯 3.0', 'BILUS 3.0')}</strong></div>
      </div>
    )
  }
  return (
    <div className={`project-visual project-visual-${project.tone} ${detail ? 'is-detail' : ''}`}>
      <div className="wowo-grid" aria-hidden="true"><span /><span /><span /><span /></div>
      <div className="wowo-window wowo-window-back"><div className="window-top"><i /><i /><i /></div><div className="window-lines"><b /><b /><b /><b /></div></div>
      <div className="wowo-window wowo-window-front"><div className="window-top"><i /><i /><i /></div><div className="window-title">WOWO</div><div className="window-line-long" /><div className="window-line-short" /><div className="window-chip-row"><i /><i /><i /></div></div>
      <div className="project-visual-caption"><span>{localized(language, '视觉系统', 'VISUAL SYSTEM')}</span><strong>{localized(language, '窝喔', 'WOWO')}</strong></div>
    </div>
  )
}

function ProjectRow({ project }: { project: Project }) {
  const { language } = useLanguage()
  return (
    <div className={`project-row-shell ${project.external ? 'has-live-access' : ''}`}>
    <Link to={`/work/${project.slug}`} className={`project-row ${project.external ? 'is-live-product' : ''}`}>
      <div className="project-row-number">{project.number}</div>
      <div className="project-row-copy">
        <span className="eyebrow">{language === 'en' ? project.english : projectCategoryZh[project.slug]}</span>
        <h3>{language === 'en' ? project.titleEn : project.title}</h3>
        <p>{language === 'en' ? project.introEn : project.intro}</p>
        <span className="project-row-link">{localized(language, '查看项目', 'View project')} <ArrowUpRight size={16} /></span>
      </div>
      <div className="project-row-media"><ProjectVisual project={project} /></div>
      <div className="project-row-arrow"><ArrowUpRight size={20} /></div>
    </Link>
    {project.external && (
      <a className="project-row-live" href={project.external} target="_blank" rel="noreferrer" aria-label={localized(language, '直接访问毕鲁斯 3.0 网站（新窗口打开）', 'Open BILUS 3.0 website in a new window')}>
        <span className="project-row-live-dot" aria-hidden="true" />
        <span>{localized(language, '访问线上产品', 'OPEN WEBSITE')}</span>
        <ExternalLink size={14} />
      </a>
    )}
    </div>
  )
}

const skillCards = [
  {
    src: '/media/skill-ui.webp',
    title: 'UI 设计师',
    titleEn: 'UI Designer',
    description: '负责公司的各个产品的 UI 界面设计和动效设计。',
    descriptionEn: 'Design UI interfaces and motion systems across the company\'s product portfolio.',
  },
  {
    src: '/media/skill-ux.webp',
    title: 'UX 体验设计师',
    titleEn: 'UX Designer',
    description: '梳理用户路径与交互流程，通过原型和体验验证持续优化产品使用体验。',
    descriptionEn: 'Shape user journeys and interaction flows, then refine the experience through prototypes and validation.',
  },
  {
    src: '/media/skill-editor.webp',
    title: '剪辑师',
    titleEn: 'Video Editor',
    description: '负责产品演示、品牌短片与动效素材的剪辑包装，统一内容节奏与视觉表达。',
    descriptionEn: 'Edit product demos, brand films, and motion assets with a consistent visual rhythm.',
  },
  {
    src: '/media/skill-frontend.webp',
    title: '前端开发',
    titleEn: 'Frontend Developer',
    description: '参与界面还原与交互动效开发，协同团队推动设计高质量落地。',
    descriptionEn: 'Build interface details and motion interactions while helping the team deliver designs accurately.',
  },
  {
    src: '/media/skill-graphic.webp',
    title: '平面设计师',
    titleEn: 'Graphic Designer',
    description: '负责品牌海报、运营物料与视觉延展，保持对外传播的一致性。',
    descriptionEn: 'Create brand posters, campaign assets, and visual extensions with a consistent public identity.',
  },
  {
    src: '/media/skill-communication.webp',
    title: '客户沟通',
    titleEn: 'Client Communication',
    description: '对接客户需求与项目进度，将业务目标转化为清晰可执行的设计方案。',
    descriptionEn: 'Align client needs and project progress, translating business goals into actionable design plans.',
  },
]

function PosterOrbit() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let animationFrame = 0
    let lastTime = performance.now()
    let autoProgress = 0
    let lastNearestIndex = -1
    let inView = false

    const renderOrbit = (now = performance.now(), advance = false) => {
      const delta = Math.min(64, Math.max(0, now - lastTime))
      lastTime = now
      if (advance && inView && !reducedMotion.matches) autoProgress = (autoProgress + delta * 0.00024) % skillCards.length
      const cardProgress = reducedMotion.matches ? 0 : autoProgress
      const nearestIndex = ((Math.round(cardProgress) % skillCards.length) + skillCards.length) % skillCards.length
      const mobile = window.innerWidth <= 700
      // Keep a full card-width of breathing room so captions and frosted layers never stack.
      const spacing = mobile
        ? Math.min(198, Math.max(176, window.innerWidth * 0.48))
        : Math.min(252, Math.max(194, window.innerWidth * 0.24))
      const half = skillCards.length / 2

      if (nearestIndex !== lastNearestIndex) {
        lastNearestIndex = nearestIndex
        setActiveIndex(nearestIndex)
      }

      cardRefs.current.forEach((card, index) => {
        if (!card) return
        let distance = index - cardProgress
        while (distance > half) distance -= skillCards.length
        while (distance < -half) distance += skillCards.length

        const absoluteDistance = Math.abs(distance)
        const x = distance * spacing
        const y = Math.pow(absoluteDistance, 1.45) * (mobile ? 8 : 11)
        const depth = mobile
          ? -90 + Math.pow(absoluteDistance, 1.25) * 32
          : -235 + Math.pow(absoluteDistance, 1.25) * 68
        const angle = distance * (mobile ? -7.5 : -10)
        const opacity = Math.max(0.12, 1 - Math.max(0, absoluteDistance - 0.35) * 0.31)
        const brightness = Math.max(0.48, 1 - absoluteDistance * 0.14)
        const scale = 1 + Math.max(0, 1 - absoluteDistance) * 0.08

        card.style.setProperty('--card-x', `${x}px`)
        card.style.setProperty('--card-y', `${y}px`)
        card.style.setProperty('--card-depth', `${depth}px`)
        card.style.setProperty('--card-angle', `${angle}deg`)
        card.style.setProperty('--card-opacity', opacity.toString())
        card.style.setProperty('--card-brightness', brightness.toString())
        card.style.setProperty('--card-scale', scale.toString())
        card.style.zIndex = `${20 - Math.round(absoluteDistance * 4)}`
      })
    }

    const tick = (now: number) => {
      animationFrame = 0
      if (!inView || reducedMotion.matches) return
      renderOrbit(now, true)
      animationFrame = window.requestAnimationFrame(tick)
    }

    const requestRender = () => {
      renderOrbit(performance.now())
      if (inView && !animationFrame && !reducedMotion.matches) {
        animationFrame = window.requestAnimationFrame(tick)
      }
    }

    renderOrbit()
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      if (!inView && animationFrame) {
        window.cancelAnimationFrame(animationFrame)
        animationFrame = 0
      }
      requestRender()
    }, { rootMargin: '12% 0px' })
    observer.observe(section)
    window.addEventListener('resize', requestRender)
    reducedMotion.addEventListener('change', requestRender)
    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
      observer.disconnect()
      window.removeEventListener('resize', requestRender)
      reducedMotion.removeEventListener('change', requestRender)
    }
  }, [])

  return (
    <section ref={sectionRef} className="poster-orbit-section" aria-label="跨领域设计能力环绕展示">
      <div className="poster-orbit-sticky">
        <Reveal className="poster-orbit-heading page-padding">
          <span className="eyebrow">06 DISCIPLINES / ONE WORKFLOW</span>
          <h2>SKILL SPECTRUM</h2>
          <p>{localized(language, '从界面设计到项目沟通，滚动查看我在完整项目流程中的六项核心能力。', 'Scroll through six core disciplines spanning interface design, delivery, and client collaboration.')}</p>
        </Reveal>
        <div className="poster-orbit-stage">
          <div className="poster-orbit-glow" aria-hidden="true" />
          <div className="poster-orbit-track">
            {skillCards.map((item, index) => {
              const active = index === activeIndex
              return (
                <article
                  ref={(node) => { cardRefs.current[index] = node }}
                    className={`poster-orbit-card ${active ? 'is-active' : ''}`}
                    key={item.titleEn}
                    tabIndex={0}
                    aria-current={active ? 'true' : undefined}
                    aria-label={`${language === 'en' ? item.titleEn : item.title}：${language === 'en' ? item.descriptionEn : item.description}`}
                  >
                    <img src={item.src} alt="" loading="eager" decoding="async" />
                    <div className="poster-orbit-card-label" aria-hidden="true">
                      <span>0{index + 1}</span>
                      <strong>{language === 'en' ? item.titleEn : item.title}</strong>
                    </div>
                    <div className="poster-orbit-card-glass" aria-hidden="true">
                    <span>0{index + 1} / CORE SKILL</span>
                    <h3>{language === 'en' ? item.titleEn : item.title}</h3>
                    <p>{language === 'en' ? item.descriptionEn : item.description}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
        <div className="poster-orbit-note page-padding">
          <span>{String(activeIndex + 1).padStart(2, '0')} / {String(skillCards.length).padStart(2, '0')}</span>
          <span>{localized(language, '滚动切换能力', 'SCROLL TO EXPLORE')}</span>
        </div>
      </div>
    </section>
  )
}

type ExperienceCardData = {
  date: string
  company: string
  role: string
  summary: string
  highlights: string[]
}

const experienceCards: Record<Language, ExperienceCardData[]> = {
  zh: [
    {
      date: '2022.01 — 2025.07',
      company: '喵们工作室',
      role: 'UI 设计师',
      summary: '负责多项 C 端 APP 与小程序的全流程 UI 设计，从需求拆解、用户画像到高保真原型与上线走查。',
      highlights: ['协同产品与开发推进落地，解决 20+ 处视觉与交互还原问题，上线还原度达 95%+。', '参与南岳旅游区新型 APP 设计，推动工作室与政府及后续小程序合作。'],
    },
    {
      date: '2025.07 — 2025.10',
      company: '美学标注项目',
      role: '数据标注负责人 / AI 训练师',
      summary: '负责美学标注团队管理与质量体系搭建，统筹 200+ 名标注员的任务分配、进度与复盘。',
      highlights: ['对接 2 个美学标注项目，所有任务提前 2–3 个工作日交付。', '建立标注标准和跨小组协作流程，客户满意度达 98%。'],
    },
    {
      date: '2025.11 — 至今',
      company: '深圳市人工智能科技有限公司',
      role: 'UI 设计师 / 项目负责人',
      summary: '独立完成恰序 AI、奥锦装修 AI 等 B 端项目；负责毕鲁斯工具端 3.0 全面更新并落地上线。',
      highlights: ['覆盖工具首页、工作台、AI 功能、组件系统、交互流程与视觉规范。', '窝喔负责全部视觉设计，项目目前处于投资阶段。'],
    },
  ],
  en: [
    {
      date: '2022.01 — 2025.07',
      company: 'Miaomen Studio',
      role: 'UI Designer',
      summary: 'Led end-to-end UI design for consumer apps and mini programs, from discovery and user framing to high-fidelity delivery and launch QA.',
      highlights: ['Partnered with product and engineering to resolve 20+ visual and interaction gaps, reaching 95%+ launch fidelity.', 'Designed a new Hengshan tourism app and helped open follow-up studio collaborations.'],
    },
    {
      date: '2025.07 — 2025.10',
      company: 'Aesthetic Labeling Program',
      role: 'Data Labeling Lead / AI Trainer',
      summary: 'Managed the aesthetic labeling team and quality system, coordinating tasks, progress, and reviews for 200+ labelers.',
      highlights: ['Coordinated two projects and delivered every milestone 2–3 working days ahead of schedule.', 'Established labeling standards and cross-team rituals, reaching 98% client satisfaction.'],
    },
    {
      date: '2025.11 — NOW',
      company: 'Shenzhen Artificial Intelligence Technology Co., Ltd.',
      role: 'UI Designer & Project Lead',
      summary: 'Independently delivered QIA XU AI and AOJIN AI B2B products, and led the full BILUS Tool 3.0 update through launch.',
      highlights: ['Updated the tool home, workspace, AI features, component system, interaction flows, and visual rules.', 'Owned all visual design for WOWO, a project currently preparing for investment.'],
    },
  ],
}

const designTools = [
  { icon: '/icons/figma.svg', name: 'Figma', detail: 'UI / PROTOTYPE' },
  { icon: '/icons/photoshop.svg', name: 'Photoshop', detail: 'IMAGE / RETOUCH' },
  { icon: '/icons/illustrator.svg', name: 'Illustrator', detail: 'VECTOR / BRAND' },
  { icon: '/icons/codex.svg', name: 'Codex', detail: 'CODE / SHIP' },
  { icon: '/icons/gemini.svg', name: 'Gemini', detail: 'RESEARCH / IDEAS' },
  { icon: '/icons/jianying.png', name: '剪映', detail: 'VIDEO / EDITING' },
]

const experienceIndexWords = ['ONE', 'TWO', 'THREE']

function ExperienceSection() {
  const { language } = useLanguage()
  const cards = experienceCards[language]
  return (
    <section className="experience-section page-padding" aria-label={language === 'en' ? 'Work experience archive' : '工作经历档案'}>
      <div className="experience-layout">
        <aside className="experience-sidebar">
          <div className="experience-sidebar-head">
            <span className="eyebrow experience-kicker">WORK HISTORY / 2022 — NOW</span>
            <h2>CAREER<br /><em>ARCHIVE.</em></h2>
            <p>{localized(language, '从消费端界面到 B 端 AI 产品，我把每一段经历整理成可交付的结构：先厘清问题，再搭建系统，最后和团队一起把它推上线。', 'From consumer interfaces to B2B AI products, I build structure, align collaborators, and turn complex workflows into experiences that ship.')}</p>
          </div>
          <Reveal className="experience-tool-stack-reveal">
            <div className="experience-tools-head"><span>{localized(language, '熟练工具 / DESIGN TOOLS', 'DESIGN TOOLS / TOOLKIT')}</span><span>06</span></div>
            <div className="experience-tool-grid">
              {designTools.map((tool, index) => (
                <div className="experience-tool" key={tool.name} style={{ '--tool-index': index } as React.CSSProperties}>
                  <span className="experience-tool-mark" aria-hidden="true"><img src={tool.icon} alt="" /></span>
                  <span className="experience-tool-copy"><strong>{tool.name}</strong><small>{tool.detail}</small></span>
                </div>
              ))}
            </div>
          </Reveal>
        </aside>
        <div className="experience-table" role="list" aria-label={language === 'en' ? 'Three roles in chronological order' : '按时间顺序排列的三段工作经历'}>
          {cards.map((item, index) => (
            <Reveal className="experience-column-reveal" delay={index * 320} key={item.date}>
              <article className="experience-column" style={{ '--experience-index': index } as React.CSSProperties}>
                <div className="experience-column-top"><span>0{index + 1}</span><span>{experienceIndexWords[index]}</span></div>
                <div className="experience-column-main">
                  <div className="experience-field experience-field-role">
                    <span className="experience-field-label">{localized(language, '01 / 担任职务', '01 / ROLE')}</span>
                    <h3>{item.role}</h3>
                    <span className="experience-field-date">{item.date}</span>
                  </div>
                  <div className="experience-field experience-field-company">
                    <span className="experience-field-label">{localized(language, '02 / 公司', '02 / COMPANY')}</span>
                    <p>{item.company}</p>
                  </div>
                  <div className="experience-field experience-field-content">
                    <span className="experience-field-label">{localized(language, '03 / 工作内容', '03 / WORK CONTENT')}</span>
                    <p>{item.summary}</p>
                    <ul>{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
                  </div>
                </div>
                <div className="experience-column-foot"><span>CHEN XING / CAREER RECORD</span><span>{String(index + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}</span></div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function HomePage() {
  usePageTitle('首页')
  const { language } = useLanguage()
  const [heroRevealDuration, setHeroRevealDuration] = useState(4.3)
  const [heroRevealed, setHeroRevealed] = useState(false)
  const heroVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const startHero = () => {
      const video = heroVideoRef.current
      if (!video) return
      video.currentTime = 0
      video.play().catch(() => undefined)
    }
    window.addEventListener('portfolio-loader-complete', startHero)
    if (!document.querySelector('.site-loader')) startHero()
    return () => window.removeEventListener('portfolio-loader-complete', startHero)
  }, [])

  function handleHeroPlaying(event: React.SyntheticEvent<HTMLVideoElement>) {
    const duration = event.currentTarget.duration
    if (Number.isFinite(duration)) setHeroRevealDuration(Math.max(1.2, duration - 0.25))
    setHeroRevealed(true)
  }

  return (
    <>
      <main>
        <section className="hero-section" style={{ '--hero-reveal-duration': `${heroRevealDuration}s` } as React.CSSProperties}>
          <video ref={heroVideoRef} className="hero-video" src="/media/hero-cover.mp4" poster="/media/hero-cover-poster.jpg" muted playsInline preload="auto" onPlaying={handleHeroPlaying} onEnded={() => setHeroRevealed(true)} aria-label={localized(language, '作品集封面动态背景', 'Portfolio cover motion background')} />
          <div className={`hero-shade ${heroRevealed ? 'is-visible' : ''}`} />
          <div className={`hero-grain ${heroRevealed ? 'is-visible' : ''}`} />
          <div className={`hero-signal ${heroRevealed ? 'is-visible' : ''}`} aria-hidden="true"><span /></div>
          <div className={`hero-content page-padding ${heroRevealed ? 'is-visible' : ''}`}>
            <Reveal className="hero-copy">
              <span className="eyebrow hero-eyebrow">SHENZHEN / 5 YEARS / UI DESIGN</span>
              <h1><span>CHEN XING</span><small> / UI DESIGNER · AI PRODUCT LEAD</small></h1>
              <p>{localized(language, '5年 UI 设计经验，专注 B 端 AI 产品、复杂工作台、组件系统与产品落地。', 'Five years of UI design experience focused on B2B AI products, complex workspaces, component systems, and production delivery.')}</p>
              <div className="hero-buttons"><ButtonLink to="/work">{localized(language, '查看作品', 'View selected work')}</ButtonLink><a className="button button-glass" href={RESUME_URL} download><Download size={16} />{localized(language, '下载简历', 'Download resume')}</a></div>
            </Reveal>
            <div className="hero-side-note"><span>SELECTED WORK</span><strong>01—04</strong><span>SCROLL TO EXPLORE</span></div>
          </div>
          <div className={`hero-scroll ${heroRevealed ? 'is-visible' : ''}`}><ArrowDown size={15} /><span>{localized(language, '向下浏览', 'SCROLL DOWN')}</span></div>
        </section>

        <IntroVisualSection />

        <ExperienceSection />

        <PosterOrbit />

        <section className="works-section page-padding">
          <div className="section-heading-row"><div><span className="eyebrow">SELECTED WORK</span><h2>{localized(language, '作品集', 'SELECTED WORK')}</h2></div><Link className="text-link" to="/work">{localized(language, '查看全部', 'View all')} <ArrowUpRight size={16} /></Link></div>
          <div className="project-list">{projects.map((project, index) => <Reveal key={project.slug} delay={index * 360}><ProjectRow project={project} /></Reveal>)}</div>
        </section>

        <section className="capability-section page-padding">
          <Reveal className="section-heading-row"><div><span className="eyebrow">WHAT I BRING</span><h2>DESIGN IS NOT<br /><em>DECORATION. IT IS STRUCTURE.</em></h2></div></Reveal>
          <div className="capability-grid">
            {[
              ['01', '复杂工作台', localized(language, '把多角色、多状态、多任务的工作流，整理成可理解的界面层级。', 'Turn multi-role, multi-state workflows into clear interface hierarchy.')],
              ['02', 'AI 产品体验', localized(language, '关注输入、生成、校验和再次编辑之间的连续反馈。', 'Shape the feedback loop from input to generation, review, and editing.')],
              ['03', '系统化交付', localized(language, '从视觉规范到组件系统，让设计在团队协作中保持一致。', 'Keep design consistent through visual rules and reusable components.')],
            ].map(([number, title, copy]) => <Reveal key={number} className="capability-item"><span className="capability-number">{number}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}
          </div>
        </section>

        <section className="availability-section page-padding"><Reveal><div className="availability-line"><span className="availability-dot" />{localized(language, '目前在深圳工作，欢迎聊聊新的产品和合作', 'Based in Shenzhen, open to new product and design collaborations')}</div></Reveal></section>
      </main>
      <SiteFooter />
    </>
  )
}

function WorkPage() {
  usePageTitle('作品')
  const { language } = useLanguage()
  return <><main className="inner-page work-page"><section className="inner-hero page-padding"><Reveal><span className="eyebrow">SELECTED WORK / 2022—NOW</span><h1>{localized(language, '作品集', 'SELECTED WORK')}<span className="title-dot">.</span></h1><p>{localized(language, '围绕 AI 产品、复杂工具和视觉系统，记录每一次从问题到落地的设计判断。', 'A record of design decisions across AI products, complex tools, and visual systems, from problem framing to launch.')}</p></Reveal></section><section className="work-index page-padding"><div className="work-index-line"><span>INDEX</span><span>04 PROJECTS</span></div>{projects.map((project, index) => <Reveal key={project.slug} delay={index * 360}><ProjectRow project={project} /></Reveal>)}</section></main><SiteFooter /></>
}

function NarrativeIcon({ icon }: { icon: 'palette' | 'type' | 'component' | 'layout' | 'layers' }) {
  const icons = { palette: Palette, type: Type, component: Component, layout: LayoutTemplate, layers: Layers3 }
  const Icon = icons[icon]
  return <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
}

function ReferenceSection({ number, eyebrow, title, intro, children, className = '' }: { number: string; eyebrow: string; title: string; intro?: string; children: React.ReactNode; className?: string }) {
  return <section className={`reference-section ${className}`}><div className="reference-section-head"><span className="reference-section-number">{number}</span><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{intro && <p>{intro}</p>}</div></div><div className="reference-section-content">{children}</div></section>
}

function ReferenceArtifact({ project, label }: { project: Project; label: string }) {
  return <figure className="reference-artifact"><ProjectVisual project={project} detail /><figcaption>{label}</figcaption></figure>
}

function ReferenceCaseDetail({ project }: { project: Project }) {
  usePageTitle(project.title)
  const { language } = useLanguage()
  const t = (copy: DualCopy) => copy[language]
  const study = caseStudies[project.slug]
  const narrative = caseNarratives[project.slug]
  const isAojin = project.slug === 'aojin-ai'
  const nextProject = projects[(projects.findIndex((item) => item.slug === project.slug) + 1) % projects.length]
  const scope = language === 'en' ? (project.scopeEn ?? project.scope) : project.scope
  const process = language === 'en' ? study.processEn : study.process
  const referenceProcess = study.process.map(([title, detail], index) => ({ stage: dual(`策略 0${index + 1}`, `STEP 0${index + 1}`), title: dual(title, study.processEn[index][0]), detail: dual(detail, study.processEn[index][1]) }))
  const components = narrative.components ?? reusableComponents
  const states = narrative.states ?? stateShowcase
  const sceneTitle = isAojin ? localized(language, '把一次生成，讲成一条清晰的装修流程。', 'Turn one generation into a clear interior-design flow.') : localized(language, '把复杂工作台，拆成团队能协作的系统。', 'Break a complex workspace into a system the team can share.')
  const sceneIntro = isAojin ? localized(language, '参考长图作品集的节奏，先解释问题和策略，再进入输入、生成、结果三个产品节点。', 'Following a long-form case-study rhythm, explain the problem and strategy before showing input, generation, and result.') : localized(language, '从业务关系、用户调研和问题归纳开始，再展示工作台、信息层级与协作结果。', 'Start with business relationships, research, and problem framing, then show the workspace, hierarchy, and team handoff.')
  const surveyEyebrow = isAojin ? 'SURVEY / 调研与问题' : 'USER RESEARCH / 用户调研'
  const surveyTitle = isAojin ? t(narrative.problemTitle) : localized(language, '先统一角色和任务，再重排工作台信息。', 'Align roles and tasks before reordering the workspace.')
  const strategyEyebrow = isAojin ? 'STRATEGY / 设计策略' : 'COLLECT QUESTIONS / 问题归纳'
  const styleEyebrow = isAojin ? 'STYLE / 视觉规范' : 'SOLUTION / 解决方案'
  const styleTitle = isAojin ? localized(language, '用蓝色建立清晰、友好的 AI 体验。', 'Use blue to make the AI experience clear and approachable.') : localized(language, '优化看板，提升信息识别和协作效率。', 'Optimize the workspace to improve recognition and collaboration.')
  const productEyebrow = isAojin ? 'PRODUCT / 产品页面' : 'ALL PAGES / 全部页面'
  const productTitle = isAojin ? localized(language, '输入、生成、结果：三段体验连成一条线。', 'Input, generation, result: one connected experience.') : localized(language, '从任务入口到结果交付，页面保持同一套秩序。', 'From task entry to handoff, every screen keeps one order.')
  const summaryEyebrow = isAojin ? 'SUMMARY / 项目总结' : 'USER FEEDBACK / 用户反馈'
  const summaryTitle = isAojin ? localized(language, '把方法留下，把下一次做得更快。', 'Keep the method. Make the next one faster.') : localized(language, '让信息更快被看懂，反馈才会真正发生。', 'Make information easier to read so feedback can happen.')
  const chapterLabels = isAojin
    ? [localized(language, '项目介绍', 'Introduction'), localized(language, '调研', 'Survey'), localized(language, '策略', 'Strategy'), localized(language, '视觉规范', 'Style'), localized(language, '产品页面', 'Product'), localized(language, '项目总结', 'Summary')]
    : [localized(language, '项目介绍', 'Introduction'), localized(language, '用户调研', 'User research'), localized(language, '收集问题', 'Collect questions'), localized(language, '解决方案', 'Solution'), localized(language, '全部页面', 'All pages'), localized(language, '用户反馈', 'User feedback')]
  return <>
    <main className={`reference-case reference-case-${project.slug}`}>
      <div className="reference-progress" aria-hidden="true" />
      <section className="reference-hero">
        <div className="reference-hero-top page-padding"><Link className="back-link" to="/work"><ArrowLeft size={16} />{localized(language, '返回作品目录', 'Back to work')}</Link><span>{project.number} / 04</span></div>
        <div className="reference-hero-copy page-padding"><span className="eyebrow">{project.english}</span><h1>{language === 'en' ? project.titleEn : project.title}<small> / REDESIGN & PRODUCT SYSTEM</small></h1><p>{localized(language, project.intro, project.introEn)}</p><div className="reference-meta"><span>{project.year}</span><span>{project.roleEn ?? project.role}</span><span>{localized(language, '真实项目复盘', 'REAL PROJECT CASE')}</span></div></div>
        <div className="reference-hero-art"><ReferenceArtifact project={project} label={localized(language, `${project.title} / 主视觉`, `${project.titleEn} / KEY VISUAL`)} /></div>
      </section>

      <div className="reference-chapters page-padding" aria-label={localized(language, '案例章节', 'Case chapters')}>
        {['01', '02', '03', '04', '05', '06'].map((number, index) => <span key={number}><b>{number}</b>{chapterLabels[index]}</span>)}
      </div>

      <div className="reference-body">
        <ReferenceSection number="01" eyebrow="INTRODUCTION / 项目介绍" title={localized(language, isAojin ? '简洁的装修 AI，重点是把流程讲清楚。' : '让复杂的 AI 工作台，变成可协作的管理系统。', isAojin ? 'A focused interior AI product, made clear through flow.' : 'A complex AI workspace, made collaborative through structure.')} intro={sceneIntro} className="reference-intro">
          <div className="reference-intro-grid"><div className="reference-copy-block"><span className="reference-label">{localized(language, '项目背景', 'CONTEXT')}</span><p>{localized(language, study.overview, study.overviewEn)}</p></div><div className="reference-copy-block"><span className="reference-label">{localized(language, '设计范围', 'SCOPE')}</span><div className="reference-scope-list">{scope.map((item) => <span key={item}>{item}</span>)}</div></div></div>
        </ReferenceSection>

        <ReferenceSection number="02" eyebrow={surveyEyebrow} title={surveyTitle} intro={t(narrative.problemBody)} className="reference-survey">
          <div className="reference-problem-list">{narrative.problemPoints.map((point, index) => <article key={point.zh}><span>0{index + 1}</span><h3>{t(point)}</h3><p>{t(narrative.evidence[index]?.decision ?? point)}</p></article>)}</div>
          <div className="reference-quote"><CircleDot size={17} /><p>{t(narrative.hypothesis)}</p></div>
        </ReferenceSection>

        <ReferenceSection number="03" eyebrow={strategyEyebrow} title={sceneTitle} intro={localized(language, '把设计判断拆成可被验证的步骤，再进入具体页面。', 'Break design decisions into verifiable steps before entering the screens.')} className="reference-strategy">
          <div className="reference-process-list">{referenceProcess.map((step, index) => <article key={step.title.zh}><div><span>0{index + 1}</span><small>{t(step.stage)}</small></div><h3>{t(step.title)}</h3><p>{t(step.detail)}</p></article>)}</div>
          <div className="reference-process-caption"><span className="reference-label">{localized(language, '执行路径', 'EXECUTION PATH')}</span><div>{process.map(([title]) => <span key={title}>{title}</span>)}</div></div>
        </ReferenceSection>

        <ReferenceSection number="04" eyebrow={styleEyebrow} title={styleTitle} intro={t(narrative.systemSummary)} className="reference-style">
          <div className="reference-style-strip"><div className="reference-color-field"><span>COLOR</span><strong>{isAojin ? 'BLUE / AIR / AI' : 'NAVY / WHITE / SIGNAL'}</strong></div><div className="reference-type-field"><span>TYPE / COMPONENT / MOTION</span><strong>{localized(language, '层级、状态和反馈保持一致。', 'Keep hierarchy, states, and feedback consistent.')}</strong></div></div>
          <div className="reference-system-list">{systemLayers.map((layer, index) => <article key={layer.name.zh}><div className="reference-system-icon"><NarrativeIcon icon={layer.icon} /></div><span>0{index + 1}</span><h3>{t(layer.name)}</h3><p>{t(layer.detail)}</p></article>)}</div>
          <div className="reference-component-sheet"><div className="reference-label">{localized(language, `${components.length} 个项目组件 / 多状态`, `${components.length} PROJECT COMPONENTS / STATES`)}</div><div className="reference-component-list">{components.map((item, index) => <div key={item.name.zh}><span>{String(index + 1).padStart(2, '0')}</span><strong>{t(item.name)}</strong><small>{t(item.state)}</small></div>)}</div></div>
        </ReferenceSection>

        <ReferenceSection number="05" eyebrow={productEyebrow} title={productTitle} intro={localized(language, '把最终页面放大展示，让视觉决策回到真实产品里。', 'Put the final screens at full scale so every decision returns to the real product.')} className="reference-product">
          <div className="reference-product-callout"><span className="reference-label">{localized(language, '页面节点', 'SCREEN LOGIC')}</span><strong>{localized(language, isAojin ? '输入要求、生成状态、结果预览各自清楚，又彼此连续。' : '任务入口、处理中反馈、结果交付各自清楚，又彼此连续。', isAojin ? 'Input, generation state, and result preview stay distinct and connected.' : 'Task entry, processing feedback, and handoff stay distinct and connected.')}</strong></div>
          <div className="reference-state-row">{states.map((state) => <article key={state.label.zh}><div className={`reference-state-dot is-${state.tone}`} /> <strong>{t(state.label)}</strong><p>{t(state.note)}</p></article>)}</div>
          <div className="reference-scene-row">{narrative.scenes.map((scene) => <article key={scene.scene.zh}><span>{t(scene.scene)}</span><h3>{t(scene.strategy)}</h3><p>{t(scene.reason)}</p></article>)}</div>
        </ReferenceSection>

        <ReferenceSection number="06" eyebrow={summaryEyebrow} title={summaryTitle} intro={t(narrative.perspective)} className="reference-summary">
          <div className="reference-summary-grid">{narrative.metrics.map((metric) => <article key={metric.label.zh}><strong>{t(metric.value)}</strong><span>{t(metric.label)}</span><p>{t(metric.detail)}</p></article>)}</div><div className="reference-summary-note"><Sparkles size={18} /><p>{language === 'en' ? study.noteEn : study.note}</p></div>
        </ReferenceSection>
      </div>
      <section className="reference-next page-padding"><Link to={`/work/${nextProject.slug}`}><span className="eyebrow">NEXT PROJECT</span><strong>{language === 'en' ? nextProject.titleEn : nextProject.title}</strong><ArrowUpRight size={22} /></Link></section>
    </main>
    <SiteFooter />
  </>
}

function WowoReferenceDetail({ project }: { project: Project }) {
  usePageTitle(project.title)
  const { language } = useLanguage()
  const [activeFlow, setActiveFlow] = useState(0)
  const t = (copy: DualCopy) => copy[language]
  const study = caseStudies[project.slug]
  const narrative = caseNarratives[project.slug]
  const nextProject = projects[(projects.findIndex((item) => item.slug === project.slug) + 1) % projects.length]
  const scope = language === 'en' ? (project.scopeEn ?? project.scope) : project.scope
  const components = narrative.components ?? reusableComponents
  const states = narrative.states ?? stateShowcase
  const process = study.process.map(([title, detail], index) => ({ stage: dual(`阶段 0${index + 1}`, `STEP 0${index + 1}`), title: dual(title, study.processEn[index][0]), detail: dual(detail, study.processEn[index][1]) }))
  const projectIntro = localized(language,
    '随着 AI 生成内容、虚拟角色和情绪陪伴类产品的发展，年轻用户不再只满足于看内容和发动态，而是希望在数字空间里拥有一个能代表自己的身份载体。窝喔从一个模糊的陪伴产品想法出发，探索如何让角色表达审美、承载情绪、产生互动，并持续被养成。',
    'As AI creation, virtual characters, and companion products grow, young users want more than content and posts. They want a digital identity that reflects their taste, holds emotion, invites interaction, and grows over time.'
  )
  const researchBody = localized(language,
    '调研虚拟社区、AI 角色陪伴、抽卡养成和空间装扮产品后，发现用户需要的不是单一聊天工具，也不是孤立的装饰玩法，而是一段从“生成属于我的角色”开始，逐步发展为日常陪伴、自我表达和社交连接的关系体验。',
    'Research across virtual communities, AI companions, collectible characters, and room decoration showed that users needed more than chat or isolated styling. They needed a relationship that begins with a character of their own and grows into daily companionship, self-expression, and social connection.'
  )
  const flow = [
    { title: dual('生成方式', 'CREATE'), subtitle: dual('从偏好开始，找到属于你的表达。', 'Start with preferences and find your own expression.'), options: [dual('根据偏好生成', 'Create from preferences'), dual('从灵感开始', 'Start from inspiration')] },
    { title: dual('选择窝灵', 'CHOOSE'), subtitle: dual('让角色成为可以陪伴和养成的身份。', 'Choose a character to accompany and nurture.'), options: [dual('温柔陪伴', 'Gentle companion'), dual('自由探索', 'Curious explorer')] },
    { title: dual('选择标签', 'PERSONALIZE'), subtitle: dual('用兴趣与性格，让生成结果更像自己。', 'Use interests and traits to make the result feel personal.'), options: [dual('治愈', 'Gentle'), dual('探索', 'Explore'), dual('收藏', 'Collect'), dual('分享', 'Share')] },
    { title: dual('生成结果', 'RESULT'), subtitle: dual('从一次生成，进入日常陪伴、装扮和分享。', 'Turn one generation into daily care, styling, and sharing.'), options: [dual('保存到我的小窝', 'Save to my space'), dual('分享身份卡', 'Share identity card')] },
  ]
  const activeScreen = flow[activeFlow]
  return <>
    <main className="reference-case reference-case-wowo">
      <div className="reference-progress" aria-hidden="true" />
      <section className="reference-hero">
        <div className="reference-hero-top page-padding"><Link className="back-link" to="/work"><ArrowLeft size={16} />{localized(language, '返回作品目录', 'Back to work')}</Link><span>04 / 04</span></div>
        <div className="reference-hero-copy page-padding"><span className="eyebrow">WOWO / BRAND & PRODUCT VISUALS</span><h1>窝喔<small> / WOWO APP & VISUAL SYSTEM</small></h1><p>{localized(language, project.intro, project.introEn)}</p><div className="reference-meta"><span>{project.year}</span><span>{project.roleEn ?? project.role}</span><span>{localized(language, '品牌与产品视觉', 'BRAND & PRODUCT VISUALS')}</span></div></div>
        <div className="reference-hero-art"><ReferenceArtifact project={project} label={localized(language, '窝喔 / 主视觉与产品演示', 'WOWO / KEY VISUAL & PRODUCT DEMO')} /></div>
      </section>

      <div className="reference-chapters page-padding" aria-label={localized(language, '案例章节', 'Case chapters')}>
        {['01', '02', '03', '04', '05', '06'].map((number, index) => <span key={number}><b>{number}</b>{[localized(language, '项目介绍', 'Introduction'), localized(language, '品牌目标', 'Objective'), localized(language, '设计策略', 'Strategy'), localized(language, '设计规范', 'Design system'), localized(language, '页面展示', 'Display'), localized(language, '项目总结', 'Summary')][index]}</span>)}
      </div>

      <div className="reference-body">
        <ReferenceSection number="01" eyebrow="INTRODUCTION / 项目介绍" title="什么是窝喔" intro={localized(language, '从模糊需求开始，先回答产品为谁而做、为什么值得被记住，再进入品牌和页面。', 'Start with an unclear brief, define who WOWO is for and why it should be remembered, then move into brand and screens.')} className="reference-intro">
          <div className="reference-intro-grid"><div className="reference-copy-block"><span className="reference-label">项目背景 / CONTEXT</span><p>{localized(language, study.overview, study.overviewEn)}</p></div><div className="reference-copy-block"><span className="reference-label">设计范围 / SCOPE</span><div className="reference-scope-list">{scope.map((item) => <span key={item}>{item}</span>)}</div></div></div>
        </ReferenceSection>

        <ReferenceSection number="02" eyebrow="OBJECTIVE / 品牌目标" title="解码 Z 世代圈层" intro={localized(language, '把产品定位、用户感受和品牌表达拆开看，再重新组合成可执行的方向。', 'Separate positioning, audience feeling, and brand expression, then recombine them into an actionable direction.')} className="reference-survey">
          <div className="reference-problem-list"><article><span>01</span><h3>明确产品定位</h3><p>从目标、用户和产品方向中建立可讨论的判断标准。</p></article><article><span>02</span><h3>建立视觉记忆</h3><p>用品牌色、字形、插画和构图形成统一气质。</p></article><article><span>03</span><h3>支持真实使用</h3><p>让视觉表达进入产品界面、展示物料和交付流程。</p></article></div>
          <div className="reference-quote"><CircleDot size={17} /><p>{t(narrative.hypothesis)}</p></div>
        </ReferenceSection>

        <ReferenceSection number="03" eyebrow="STRATEGY / 设计策略" title="全链重构新体验" intro={localized(language, '从方向澄清、产品结构到视觉建立，再推进到完整交付。', 'Move from direction, to product structure, to visual language, and finally to delivery.')} className="reference-strategy">
          <div className="reference-process-list">{process.map((step, index) => <article key={step.title.zh}><div><span>0{index + 1}</span><small>{t(step.stage)}</small></div><h3>{t(step.title)}</h3><p>{t(step.detail)}</p></article>)}</div>
          <div className="reference-process-caption"><span className="reference-label">执行路径 / EXECUTION PATH</span><div>{process.map((step) => <span key={step.title.zh}>{t(step.title)}</span>)}</div></div>
        </ReferenceSection>

        <ReferenceSection number="04" eyebrow="DESIGN SYSTEM / 设计规范" title="粉色不是装饰，是窝喔的识别入口。" intro={t(narrative.systemSummary)} className="reference-style">
          <div className="reference-style-strip"><div className="reference-color-field"><span>COLOR</span><strong>PINK / WARM / WOWO</strong></div><div className="reference-type-field"><span>TYPE / ICON / MOTION</span><strong>把品牌气质收敛成可以被复用的产品规则。</strong></div></div>
          <div className="reference-system-list">{systemLayers.map((layer, index) => <article key={layer.name.zh}><div className="reference-system-icon"><NarrativeIcon icon={layer.icon} /></div><span>0{index + 1}</span><h3>{t(layer.name)}</h3><p>{t(layer.detail)}</p></article>)}</div>
          <div className="reference-component-sheet"><div className="reference-label">{components.length} 个项目组件 / 多状态</div><div className="reference-component-list">{components.map((item, index) => <div key={item.name.zh}><span>{String(index + 1).padStart(2, '0')}</span><strong>{t(item.name)}</strong><small>{t(item.state)}</small></div>)}</div></div>
        </ReferenceSection>

        <ReferenceSection number="05" eyebrow="DISPLAY / 页面展示" title="页面展示" intro={localized(language, '从品牌初见、日常使用到对外展示，保持同一套产品气质。', 'From first look, to daily use, to external presentation, keep one product character.')} className="reference-product">
          <div className="reference-product-callout"><span className="reference-label">页面节点 / SCREEN LOGIC</span><strong>品牌初见、内容浏览、核心操作和展示物料彼此连贯。</strong></div>
          <div className="wowo-display-gallery">
            <figure><img src="/media/wowo-cover.png" alt="窝喔产品视觉封面" loading="lazy" decoding="async" /><figcaption><span>01</span>产品视觉 / PRODUCT VISUAL</figcaption></figure>
            <figure><img src="/media/wowo-poster.jpg" alt="窝喔产品演示画面" loading="lazy" decoding="async" /><figcaption><span>02</span>页面演示 / PRODUCT PREVIEW</figcaption></figure>
          </div>
          <div className="reference-state-row">{states.map((state) => <article key={state.label.zh}><div className={`reference-state-dot is-${state.tone}`} /><strong>{t(state.label)}</strong><p>{t(state.note)}</p></article>)}</div>
          <div className="reference-scene-row">{narrative.scenes.map((scene) => <article key={scene.scene.zh}><span>{t(scene.scene)}</span><h3>{t(scene.strategy)}</h3><p>{t(scene.reason)}</p></article>)}</div>
        </ReferenceSection>

        <ReferenceSection number="06" eyebrow="SUMMARY / 项目总结" title="总结收获" intro={t(narrative.perspective)} className="reference-summary">
          <div className="reference-summary-grid">{narrative.metrics.map((metric) => <article key={metric.label.zh}><strong>{t(metric.value)}</strong><span>{t(metric.label)}</span><p>{t(metric.detail)}</p></article>)}</div><div className="reference-summary-note"><Sparkles size={18} /><p>{language === 'en' ? study.noteEn : study.note}</p></div>
        </ReferenceSection>
      </div>
      <section className="reference-next page-padding"><Link to={`/work/${nextProject.slug}`}><span className="eyebrow">NEXT PROJECT</span><strong>{language === 'en' ? nextProject.titleEn : nextProject.title}</strong><ArrowUpRight size={22} /></Link></section>
    </main>
    <SiteFooter />
  </>
}

function AojinPhone({ variant, label, wide = false }: { variant: 'home' | 'input' | 'result' | 'quote' | 'nav'; label: string; wide?: boolean }) {
  const content = {
    home: <><div className="aojin-phone-avatar">Hi</div><h4>今天想生成什么</h4><p>上传图片，描述你的想法，AI 帮你整理出图</p><div className="aojin-phone-pills"><span>建筑图</span><span>空间灵感</span><span>精准报价</span></div></>,
    input: <><h4>新对话</h4><div className="aojin-phone-field">描述你的建筑需求...</div><div className="aojin-phone-upload"><span>＋</span><small>上传参考图</small></div><button>开始生成</button></>,
    result: <><h4>生成结果</h4><div className="aojin-phone-image" /><div className="aojin-phone-result-row"><span>重新生成</span><span>保存方案</span></div><button>继续完善</button></>,
    quote: <><h4>精准报价</h4><div className="aojin-phone-form"><span>户型面积</span><b>120 ㎡</b><span>装修风格</span><b>现代简约</b><span>预算范围</span><b>30 - 50 万</b></div><button>生成报价</button></>,
    nav: <><h4>功能导航</h4><div className="aojin-phone-nav-grid"><span>图生图</span><span>高清放大</span><span>精准报价</span><span>灵感广场</span><span>客服中心</span><span>我的方案</span></div></>,
  }[variant]
  const realScreen = variant === 'input' ? '/media/aojin-input-screen.png' : variant === 'result' ? '/media/aojin-result-screen.png' : variant === 'quote' ? '/media/aojin-quote-screen.png' : variant === 'nav' ? '/media/aojin-community-screen.png' : variant === 'home' ? '/media/aojin-home-real.png' : undefined
  return <figure className={`aojin-phone-card ${wide ? 'is-wide' : ''} ${realScreen ? 'has-real-screen' : ''}`}><div className="aojin-phone-shell">{realScreen ? <img className="aojin-phone-real-screen" src={realScreen} alt={label} loading="lazy" decoding="async" /> : <><div className="aojin-phone-status"><span>9:41</span><i /><i /><i /></div><div className="aojin-phone-screen">{content}</div><div className="aojin-phone-bottom"><span>智能助手</span><span>灵感广场</span><span>客服中心</span></div></>}</div><figcaption>{label}</figcaption></figure>
}

function AojinReferenceDetail({ project }: { project: Project }) {
  usePageTitle(project.title)
  const { language } = useLanguage()
  const nextProject = projects[(projects.findIndex((item) => item.slug === project.slug) + 1) % projects.length]
  const study = caseStudies[project.slug]
  const narrative = caseNarratives[project.slug]
  const t = (copy: DualCopy) => copy[language]
  return <>
    <main className="aojin-reference-case">
      <div className="reference-progress" aria-hidden="true" />
      <section className="aojin-reference-hero">
        <div className="aojin-reference-top page-padding"><Link className="back-link" to="/work"><ArrowLeft size={16} />{localized(language, '返回作品目录', 'Back to work')}</Link><span>02 / 04</span></div>
        <div className="aojin-reference-copy page-padding"><span className="eyebrow">AOJIN / INTERIOR AI WORKFLOW</span><h1>奥锦装修 AI<small> / MOBILE PRODUCT CASE</small></h1><p>{localized(language, project.intro, project.introEn)}</p><div className="reference-meta"><span>{project.year}</span><span>{project.roleEn ?? project.role}</span><span>402 × 874 / MOBILE UI</span></div></div>
        <div className="aojin-reference-hero-media"><ReferenceArtifact project={project} label={localized(language, '奥锦装修 AI / 顶部完整产品演示', 'AOJIN AI / FULL PRODUCT DEMO')} /></div>
      </section>
      <div className="aojin-reference-chapters page-padding"><span><b>01</b>Introduction</span><span><b>02</b>Survey</span><span><b>03</b>Why</span><span><b>04</b>Strategy</span><span><b>05</b>Style</span><span><b>06</b>All pages</span></div>
      <section className="aojin-board a board-intro"><div className="aojin-board-inner"><span className="aojin-board-index">01 / INTRODUCTION</span><h2>一个简洁、闭环的装修 AI 产品</h2><p>{localized(language, study.overview, study.overviewEn)}</p><div className="aojin-intro-grid"><AojinPhone variant="home" label="首页 / 智能助手" /><div className="aojin-intro-copy"><span>PRODUCT MAP</span><h3>从进入产品，到拿到一张可用的装修方案。</h3><p>输入需求、上传参考图、选择风格，再进入生成结果。每一个手机页面都围绕“少一步解释，多一点确定”展开。</p><div className="aojin-scope-row"><span>AI 生成</span><span>图生图</span><span>精准报价</span><span>结果完善</span></div></div></div></div></section>
      <section className="aojin-board b board-survey"><div className="aojin-board-inner"><span className="aojin-board-index">02 / SURVEY</span><h2>用户为什么没有继续下一步？</h2><p>从页面结构和手机端使用场景出发，问题集中在入口分散、输入不明确、生成过程缺少反馈。</p><div className="aojin-why-grid"><article><b>01</b><h3>入口需要更快被理解</h3><p>用户打开产品后，需要立即知道“今天可以生成什么”。</p></article><article><b>02</b><h3>输入需要更有安全感</h3><p>上传、描述和选择并不是三个孤立动作，而是一条连续的任务。</p></article><article><b>03</b><h3>等待必须被看见</h3><p>AI 处理中要告诉用户进度、结果和继续完善的路径。</p></article></div></div></section>
      <section className="aojin-board b board-survey-detail"><div className="aojin-board-inner"><span className="aojin-board-index">02 / SURVEY DETAIL</span><h2>三个断点，决定用户是否继续。</h2><p>把问题落到真实手机页面：入口先建立预期，输入页降低描述压力，结果页给出明确的下一步。</p><div className="aojin-survey-detail-layout"><div className="aojin-survey-detail-copy"><article><b>01 / 入口理解</b><h3>先说清楚今天能做什么</h3><p>首页要把 AI 生成、图生图、高清放大和精准报价放在用户看得见的第一层，减少“我该从哪里开始”的停顿。</p></article><article><b>02 / 输入安全感</b><h3>让上传和描述成为连续动作</h3><p>输入区域同时提供示例、参考图和字段提示，让用户知道需要准备什么，也知道提交后会得到什么。</p></article><article><b>03 / 结果反馈</b><h3>生成完成之后仍然有下一步</h3><p>结果页保留保存、对比、沟通和继续完善的出口，让一次生成进入真实装修决策。</p></article></div><div className="aojin-survey-detail-phones"><AojinPhone variant="input" label="输入需求 / INPUT" /><AojinPhone variant="result" label="生成结果 / RESULT" /></div></div></div></section>
      <section className="aojin-board c board-strategy"><div className="aojin-board-inner"><span className="aojin-board-index">03 / STRATEGY</span><h2>策略：让输入、生成、结果连成一条线</h2><p>不增加复杂功能，只通过信息层级、组件统一和状态反馈完成前端视觉优化。</p><div className="aojin-strategy-row"><article><b>01</b><h3>输入清楚</h3><p>用示例和字段提示，说明上传什么、描述什么。</p></article><article><b>02</b><h3>反馈及时</h3><p>处理中、完成、错误和重试状态都保持同一套语言。</p></article><article><b>03</b><h3>结果可继续</h3><p>生成结果不是终点，保存、对比和沟通都能自然接上。</p></article></div></div></section>
      <section className="aojin-board d board-style"><div className="aojin-board-inner"><span className="aojin-board-index">04 / STYLE</span><h2>设计规范：移动端的轻量视觉系统</h2><p>以 `#F6F7F9` 为底色，白色内容层承载操作，蓝色作为 AI 反馈和主动作信号。</p><div className="aojin-style-grid"><div className="aojin-color-sheet"><span>COLOR DEFINITION</span><div><i /><i /><i /><i /></div><small>#F6F7F9 / #FFFFFF / #2576FE / #111418</small></div><div className="aojin-component-sheet"><span>COMPONENTS</span><div className="aojin-component-pills"><b>图生图</b><b>高清放大</b><b>精准报价</b><b>开始生成</b><b>保存方案</b><b>继续完善</b></div></div></div><div className="aojin-style-phones"><AojinPhone variant="nav" label="功能导航组件" /><AojinPhone variant="quote" label="精准报价表单" /><AojinPhone variant="input" label="AI 输入状态" /></div></div></section>
      <section className="aojin-board e board-pages"><div className="aojin-board-inner"><span className="aojin-board-index">05 / ALL PAGES</span><h2>页面展示：把真实手机界面放回流程里</h2><p>以下页面来自奥锦移动端设计说明，按首页、输入、生成、报价和结果状态重新组织。</p><div className="aojin-page-wall"><AojinPhone variant="home" label="01 / 首页" /><AojinPhone variant="input" label="02 / 描述需求" /><AojinPhone variant="result" label="03 / 生成结果" /><AojinPhone variant="quote" label="04 / 精准报价" /><AojinPhone variant="nav" label="05 / 功能导航" /></div><div className="aojin-state-strip"><span>空状态</span><span>输入状态</span><span>处理中</span><span>生成完成</span><span>错误与重试</span></div></div></section>
      <section className="aojin-board a board-figma-export"><div className="aojin-board-inner"><span className="aojin-board-index">FIGMA / 16080:35088</span><h2>原始设计页面</h2><p>直接使用 Figma 中的真实页面导出，保留手机端设计说明里的视觉比例与页面信息。</p><figure className="aojin-figma-export"><img src={AOJIN_FIGMA_FRAME_URL} alt="奥锦 Figma 原始设计 Frame" loading="lazy" decoding="async" /><figcaption>Figma export / node 16080:35088</figcaption></figure></div></section>
      <section className="aojin-board f board-summary"><div className="aojin-board-inner"><span className="aojin-board-index">06 / SUMMARY</span><h2>把流程讲清楚，AI 才真正变得可用。</h2><p>{t(narrative.perspective)}</p><div className="aojin-summary-values"><strong>INPUT</strong><strong>GENERATE</strong><strong>RESULT</strong></div><div className="aojin-summary-note">{language === 'en' ? study.noteEn : study.note}</div></div></section>
      <section className="reference-next page-padding aov-next"><Link to={`/work/${nextProject.slug}`}><span className="eyebrow">NEXT PROJECT</span><strong>{language === 'en' ? nextProject.titleEn : nextProject.title}</strong><ArrowUpRight size={22} /></Link></section>
    </main>
    <SiteFooter />
  </>
}

function WowoEditorialDetail({ project }: { project: Project }) {
  usePageTitle(project.title)
  const { language } = useLanguage()
  const t = (copy: DualCopy) => copy[language]
  const narrative = caseNarratives.wowo
  const nextProject = projects[(projects.findIndex((item) => item.slug === project.slug) + 1) % projects.length]
  const [activeFlow, setActiveFlow] = useState(0)
  const chapters = [['01', '项目介绍', 'wo-intro'], ['02', '发现问题', 'wo-discovery'], ['03', '解决方向', 'wo-direction'], ['04', '品牌主张', 'wo-thesis'], ['05', '设计规范', 'wo-system'], ['06', '体验流程', 'wo-prototype'], ['07', '社区连接', 'wo-community'], ['08', '总结收获', 'wo-summary']]
  const flow = [
    { title: dual('生成方式', 'CREATE'), copy: dual('从偏好开始，找到属于你的表达。', 'Start with preferences and find your own expression.'), choices: ['根据偏好生成', '从灵感开始'] },
    { title: dual('选择窝灵', 'CHOOSE'), copy: dual('让角色成为可以陪伴和养成的身份。', 'Choose a character to accompany and nurture.'), choices: ['温柔陪伴', '自由探索'] },
    { title: dual('选择标签', 'PERSONALIZE'), copy: dual('用兴趣与性格，让生成结果更像自己。', 'Use interests and traits to make the result feel personal.'), choices: ['治愈', '探索', '收藏', '分享'] },
    { title: dual('生成结果', 'RESULT'), copy: dual('从一次生成，进入日常陪伴、装扮和分享。', 'Turn one generation into daily care, styling, and sharing.'), choices: ['保存到我的小窝', '分享身份卡'] },
  ]
  const insightRows = [
    { number: '01', title: '陪伴感单一', en: 'ONE-DIMENSIONAL CARE', copy: '很多陪伴产品停留在聊天框或固定反馈，缺少状态变化、情绪回应和长期关系感。', icon: Heart },
    { number: '02', title: '社区连接浅', en: 'SHALLOW CONNECTION', copy: '普通社区内容容易同质化，用户需要围绕角色、身份卡和小窝产生更轻量的互动关系。', icon: Users },
    { number: '03', title: '玩法形成复访', en: 'REASON TO RETURN', copy: '改造、抽卡、喂养和任务反馈，需要连成可持续的收藏、养成与分享体验。', icon: Sparkles },
  ]
  const activeStep = flow[activeFlow]
  return <>
    <main className="wowo-portfolio">
      <div className="wowo-progress" aria-hidden="true" />
      <section className="wo-cover" id="wo-cover">
        <div className="wo-cover-top"><Link to="/work"><ArrowLeft size={15} />{localized(language, '返回作品', 'BACK TO WORK')}</Link><span>WO / 2026</span><span>BRAND · PRODUCT · COMMUNITY</span></div>
        <div className="wo-cover-grid"><div className="wo-cover-copy"><span className="wo-eyebrow">A LITTLE SPACE, A LOT OF FEELING</span><h1>窝喔<span>WO</span></h1><p>{localized(language, '生成一个属于自己的窝灵，在陪伴、装扮、互动和分享里，慢慢长成自己的小窝。', 'Create a companion of your own, then grow a little world through care, style, play, and sharing.')}</p><div className="wo-cover-meta"><span>2025—2026</span><span>BRAND & PRODUCT VISUALS</span><span>04 / 04</span></div></div><div className="wo-cover-media"><div className="wo-cover-backmark" aria-hidden="true">WOWO</div><div className="wo-demo-frame"><ProjectVisual project={project} detail /></div><span className="wo-media-caption">PRODUCT FILM / FROM GENERATION TO DAILY LIFE</span></div></div>
        <div className="wo-cover-bottom"><span>PERSONAL IDENTITY</span><span>DAILY COMPANIONSHIP</span><span>COMMUNITY CONNECTION</span><span>SCROLL TO EXPLORE <ArrowDown size={14} /></span></div>
      </section>

      <nav className="wo-chapter-nav" aria-label={localized(language, '项目章节', 'Project chapters')}>
        {chapters.map(([number, label, id]) => <button type="button" key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}><small>{number}</small><span>{label}</span></button>)}
      </nav>

      <section className="wo-section wo-intro" id="wo-intro"><div className="wo-inner wo-intro-grid"><div className="wo-index"><b>01</b><span>PROJECT<br />INTRODUCTION</span></div><div className="wo-intro-copy"><span className="wo-eyebrow">WHAT IS WO?</span><h2>让一个虚拟角色，<br /><em>成为自己的身份。</em></h2><p>{localized(language, '随着 AI 生成内容、虚拟角色和情绪陪伴类产品的发展，年轻用户不再只满足于看内容和发动态，而是希望在数字空间里拥有一个能代表自己的身份载体。窝喔从一个模糊的陪伴产品想法出发，探索如何让角色表达审美、承载情绪、产生互动，并持续被养成。', 'As AI creation, virtual characters, and companion products grow, young users want more than content and posts. They want a digital identity that reflects their taste, holds emotion, invites interaction, and grows over time.')}</p><p>{localized(language, '设计重点不是单纯做一个可爱的虚拟宠物，而是围绕“生成专属陪伴关系”构建体验闭环。', 'The design is not simply a cute virtual pet. It builds a complete loop around creating a personal companion relationship.')}</p><div className="wo-intro-quote">“{localized(language, '从生成一个属于我的角色，到建立日常陪伴，再到自我表达与社交连接。', 'From creating a character of my own, to daily companionship, self-expression, and social connection.')}”</div></div><div className="wo-intro-side"><span className="wo-side-number">WO</span><div><b>IDENTITY</b><b>COMPANIONSHIP</b><b>CONNECTION</b></div></div></div></section>

      <section className="wo-section wo-discovery" id="wo-discovery"><div className="wo-inner"><header className="wo-section-head"><div className="wo-index"><b>02</b><span>USER<br />INSIGHT</span></div><div><span className="wo-eyebrow">DISCOVERY / USER NEEDS</span><h2>关系，不该停在聊天框里。</h2><p>{localized(language, '在虚拟社区、AI 角色陪伴、抽卡养成和空间装扮产品中寻找机会点，把零散玩法重新组织成完整的情绪关系体验。', 'Research across virtual communities, AI companions, collectible characters, and room decoration to turn scattered mechanics into one emotional relationship experience.')}</p></div></header><div className="wo-insight-list">{insightRows.map((row) => { const Icon = row.icon; return <article key={row.number}><span className="wo-insight-no">{row.number}</span><div className="wo-insight-icon"><Icon size={25} strokeWidth={1.5} /></div><div className="wo-insight-text"><h3>{row.title}</h3><small>{row.en}</small><p>{row.copy}</p></div><ArrowUpRight className="wo-insight-arrow" size={20} /></article> })}</div></div></section>

      <section className="wo-section wo-direction" id="wo-direction"><div className="wo-inner"><header className="wo-section-head"><div className="wo-index"><b>03</b><span>STRATEGY<br />& POSITIONING</span></div><div><span className="wo-eyebrow">SOLUTION / EXPERIENCE LOOP</span><h2>把陪伴做成一段关系。</h2><p>{localized(language, '先生成专属角色，再建立日常回应，最后通过身份与社区把关系带出去。', 'Create a personal character, build daily responses, then carry that relationship into identity and community.')}</p></div><div className="wo-direction-mark">3<small>STEPS</small></div></header><div className="wo-loop"><div className="wo-loop-line" aria-hidden="true" />{[
          { no: '01', title: '看见价值', en: 'VALUE DISCOVERY', text: '承接登录、问卷、AI 生成和结果页，让用户快速理解“窝喔能帮我生成什么”。', icon: Sparkles },
          { no: '02', title: '触发互动', en: 'SOCIAL CONNECTION', text: '承接身份卡、窝圈、串门、消息和个人主页，让用户带着自己的窝进入社交表达。', icon: Heart },
          { no: '03', title: '形成复访', en: 'RETURN & GROW', text: '承接改造、抽卡、喂养和任务反馈，把一次惊喜延伸成收藏、养成和分享。', icon: Users },
        ].map((item, index) => { const Icon = item.icon; return <article className={`wo-loop-step wo-loop-step-${index + 1}`} key={item.no}><span>{item.no}</span><div className="wo-loop-glyph"><Icon size={24} strokeWidth={1.5} /></div><small>{item.en}</small><h3>{item.title}</h3><p>{item.text}</p></article> })}</div><p className="wo-direction-caption">{localized(language, t(narrative.hypothesis), t(narrative.hypothesis))}</p></div></section>

      <section className="wo-section wo-thesis" id="wo-thesis"><div className="wo-inner"><header className="wo-section-head"><div className="wo-index"><b>04</b><span>BRAND<br />THESIS</span></div><div><span className="wo-eyebrow">BRAND / THREE PILLARS</span><h2>一个小窝，三种连接。</h2><p>从个人陪伴到社区关系，让每个设计决定都有情绪目的。</p></div></header><div className="wo-thesis-layout"><div className="wo-thesis-art"><img src="/media/wowo-cover.png" alt="窝喔产品视觉主图" loading="lazy" decoding="async" /><span>MY OWN LITTLE WORLD</span></div><div className="wo-thesis-values"><article><span>01 / TO MYSELF</span><h3>专属陪伴</h3><p>窝灵不只是角色，更是可以持续被养成的情绪关系。</p></article><article><span>02 / TO MY WORLD</span><h3>自我表达</h3><p>通过小窝、装扮和身份卡，把个人审美沉淀在数字空间。</p></article><article><span>03 / TO OTHERS</span><h3>社区连接</h3><p>从分享窝灵、加入窝圈到串门互动，让关系自然发生。</p></article></div></div></div></section>

      <section className="wo-section wo-system" id="wo-system"><div className="wo-inner"><header className="wo-section-head"><div className="wo-index"><b>05</b><span>VISUAL<br />SYSTEM</span></div><div><span className="wo-eyebrow">DESIGN LANGUAGE / TOKENS</span><h2>粉色建立识别，规则支撑长期迭代。</h2><p>用品牌粉承接亲和与情绪，用黑白组织信息，以薄荷青标记互动和状态变化。</p></div></header><div className="wo-color-board"><div className="wo-color-main"><span>BRAND PINK</span><strong>#FD749D</strong><i /></div><div className="wo-color-cyan"><span>INTERACTION</span><strong>#2FD6D0</strong><i /></div><div className="wo-color-white"><span>CANVAS</span><strong>#FFF9FB</strong><i /></div><div className="wo-color-black"><span>CONTRAST</span><strong>#000000</strong><i /></div></div><div className="wo-type-board"><div><span className="wo-eyebrow">DISPLAY TYPE</span><strong>窝喔<em> WO</em></strong></div><div><span className="wo-eyebrow">BODY / INTERFACE</span><p>易读层级 / 清晰状态 / 情绪反馈</p></div><div className="wo-type-sample">Aa 字体层级 123</div></div><div className="wo-icon-board"><div className="wo-icon-heading"><span className="wo-eyebrow">ICON & COMPONENT LANGUAGE</span><p>统一圆角、描边和状态色，让功能清晰，也保留角色亲和力。</p></div><div className="wo-icon-set">{[[Heart, '陪伴'], [Home, '小窝'], [Users, '窝圈'], [MessageCircle, '互动'], [Sparkles, '生成'], [Palette, '装扮'], [CircleCheck, '完成'], [CircleDot, '选择']].map(([Icon, label], index) => <div className={`wo-icon-item wo-icon-item-${index + 1}`} key={label as string}><Icon size={22} strokeWidth={1.6} /><span>{label as string}</span></div>)}</div></div></div></section>

      <section className="wo-section wo-prototype" id="wo-prototype"><div className="wo-inner"><header className="wo-section-head"><div className="wo-index"><b>06</b><span>INTERACTIVE<br />PROTOTYPE</span></div><div><span className="wo-eyebrow">PRODUCT FLOW / LIVE PREVIEW</span><h2>从偏好选择，到专属窝灵。</h2><p>点击步骤切换产品节点，体验一次生成如何接入陪伴与分享。</p></div></header><div className="wo-prototype-tabs" role="tablist" aria-label="窝喔生成流程">{flow.map((step, index) => <button type="button" role="tab" aria-selected={activeFlow === index} className={activeFlow === index ? 'is-active' : ''} key={step.title.zh} onClick={() => setActiveFlow(index)}><small>0{index + 1}</small><span>{t(step.title)}</span><ArrowRight size={15} /></button>)}</div><div className="wo-prototype-stage"><div className="wo-prototype-copy"><span className="wo-eyebrow">STEP 0{activeFlow + 1} / {activeStep.title.en}</span><h3>{t(activeStep.title)}</h3><p>{t(activeStep.copy)}</p><div className="wo-prototype-options">{activeStep.choices.map((choice, index) => <button type="button" className={index === 0 ? 'is-selected' : ''} key={choice}><span>{index === 0 ? <Check size={14} /> : <CircleDot size={14} />}</span>{choice}</button>)}</div><button className="wo-prototype-next" type="button" onClick={() => setActiveFlow((current) => (current + 1) % flow.length)}>{localized(language, activeFlow === 3 ? '再看一次流程' : '继续下一步', activeFlow === 3 ? 'REPLAY FLOW' : 'CONTINUE')}<ArrowRight size={16} /></button></div><div className={`wo-phone-preview wo-phone-step-${activeFlow + 1}`}><div className="wo-phone-top"><span>09:41</span><i /><span>•••</span></div><div className="wo-phone-screen"><div className="wo-phone-brand">窝喔<small>YOUR LITTLE WORLD</small></div>{activeFlow === 0 && <div className="wo-phone-question"><span>01 / YOUR PREFERENCES</span><strong>你希望窝灵是什么感觉？</strong><div className="wo-mini-options"><b>温柔陪伴</b><b>自由探索</b><b>安静治愈</b></div></div>}{activeFlow === 1 && <div className="wo-phone-choice"><span>CHOOSE YOUR COMPANION</span><div className="wo-choice-orbit"><Heart size={31} /><b>WO·01</b></div><strong>选择你的窝灵</strong></div>}{activeFlow === 2 && <div className="wo-phone-tags"><span>为窝灵选择标签</span><div><b>治愈</b><b>探索</b><b>收藏</b><b>分享</b><b>陪伴</b><b>创作</b></div></div>}{activeFlow === 3 && <div className="wo-phone-result"><div className="wo-result-orbit"><img src="/media/wowo-cover.png" alt="窝喔角色生成结果" /></div><span>你的窝灵已经准备好了</span><strong>欢迎回到你的小窝</strong><button type="button">进入我的小窝</button></div>}<div className="wo-phone-nav"><span><Home size={15} /></span><span><Heart size={15} /></span><span className="is-plus">+</span><span><MessageCircle size={15} /></span><span><Users size={15} /></span></div></div></div></div></div></section>

      <section className="wo-section wo-community" id="wo-community"><div className="wo-inner"><header className="wo-section-head"><div className="wo-index"><b>07</b><span>COMMUNITY<br />CONNECTION</span></div><div><span className="wo-eyebrow">FIND YOUR CIRCLE</span><h2>找到和你同频的小窝。</h2><p>一起分享角色、房间和日常灵感，让数字身份进入真实的社交表达。</p></div></header><div className="wo-community-layout"><div className="wo-community-visual"><img src="/media/wowo-poster.jpg" alt="窝喔社区内容视觉" loading="lazy" decoding="async" /><span>WO CIRCLE / SHARE A LITTLE MOMENT</span></div><div className="wo-community-copy"><span className="wo-eyebrow">PERSONAL → SOCIAL</span><h3>窝圈不是内容列表，<br />而是关系的入口。</h3><p>围绕角色、身份卡和小窝发生推荐、串门、加入与分享。</p><div className="wo-community-links"><span><Users size={17} />推荐窝圈</span><span><Heart size={17} />推荐好友</span><span><Home size={17} />串门互动</span></div></div></div></div></section>

      <section className="wo-section wo-summary" id="wo-summary"><div className="wo-inner"><div className="wo-summary-top"><div className="wo-index"><b>08</b><span>PROJECT<br />SUMMARY</span></div><span className="wo-eyebrow">A WORLD THAT GROWS WITH YOU</span></div><h2>从一次生成，<br /><em>到一段长期关系。</em></h2><p>{t(narrative.perspective)}</p><div className="wo-summary-values"><span>陪伴 / COMPANIONSHIP</span><span>表达 / IDENTITY</span><span>连接 / COMMUNITY</span></div><div className="wo-summary-footer"><span>WOWO / BRAND & PRODUCT EXPERIENCE</span><Link to={`/work/${nextProject.slug}`}>{localized(language, '下一个项目', 'NEXT PROJECT')}<ArrowUpRight size={17} /></Link></div></div></section>
    </main>
    <SiteFooter />
  </>
}

function BilusReferenceDetail({ project }: { project: Project }) {
  usePageTitle(project.title)
  const { language } = useLanguage()
  const t = (copy: DualCopy) => copy[language]
  const study = caseStudies[project.slug]
  const narrative = caseNarratives[project.slug]
  const nextProject = projects[(projects.findIndex((item) => item.slug === project.slug) + 1) % projects.length]
  const scope = language === 'en' ? (project.scopeEn ?? project.scope) : project.scope
  const components = narrative.components ?? reusableComponents
  const states = narrative.states ?? stateShowcase
  return <>
    <main className="bilus-reference-case">
      <div className="reference-progress" aria-hidden="true" />
      <section className="bilus-reference-hero">
        <div className="reference-hero-top page-padding"><Link className="back-link" to="/work"><ArrowLeft size={16} />{localized(language, '返回作品目录', 'Back to work')}</Link><span>01 / 04</span></div>
        <div className="bilus-reference-hero-copy page-padding"><span className="eyebrow">BILUS TOOL / AI CREATION PLATFORM</span><h1>毕鲁斯 3.0<small> / IMAGE · VIDEO · 3D WORKSPACE</small></h1><p>{localized(language, '面向 AI 创作者的统一工作台：从提示词和参考图开始，完成生图、生视频与 3D 建模，并把结果继续编辑和交付。', 'A unified workspace for AI creators: start with prompts and references, generate images, videos, and 3D assets, then keep editing and deliver the result.')}</p><div className="reference-meta"><span>{project.year}</span><span>{project.roleEn ?? project.role}</span><span>{localized(language, 'AI 创作平台改版', 'AI CREATION PLATFORM REDESIGN')}</span></div></div>
        <div className="bilus-reference-art"><ReferenceArtifact project={project} label={localized(language, '毕鲁斯 3.0 / 工作台主视觉', 'BILUS 3.0 / WORKSPACE KEY VISUAL')} /></div>
      </section>
      <div className="bilus-reference-chapters page-padding"><span><b>01</b>{localized(language, '产品定位', 'Product')}</span><span><b>02</b>{localized(language, '创作模式', 'Modes')}</span><span><b>03</b>{localized(language, '生成工作流', 'Workflow')}</span><span><b>04</b>{localized(language, '工作台系统', 'Workspace')}</span><span><b>05</b>{localized(language, '交付结果', 'Delivery')}</span><span><b>06</b>{localized(language, '设计总结', 'Summary')}</span></div>
      <div className="bilus-reference-body">
        <ReferenceSection number="01" eyebrow="PRODUCT / 产品定位" title="一个面向 AI 创作的统一工作台。" intro={localized(language, '毕鲁斯 3.0 类似即梦一类的 AI 创作平台：用户可以用文字和图片生成视觉内容，也可以继续进入视频和 3D 建模流程。改版重点是把多种创作能力放进同一条可理解、可追踪、可交付的工作流。', 'BILUS 3.0 is an AI creation platform like Jimeng: generate visual content from text and images, then continue into video and 3D workflows. The redesign brings these capabilities into one understandable, traceable, deliverable workflow.')} className="bilus-reference-section">
          <div className="reference-intro-grid"><div className="reference-copy-block"><span className="reference-label">项目背景 / CONTEXT</span><p>{localized(language, study.overview, study.overviewEn)}</p></div><div className="reference-copy-block"><span className="reference-label">设计范围 / SCOPE</span><div className="reference-scope-list">{scope.map((item) => <span key={item}>{item}</span>)}</div></div></div>
        </ReferenceSection>
        <ReferenceSection number="02" eyebrow="MODES / 创作模式" title="同一个入口，承接四种 AI 创作任务。" intro={localized(language, '不是把功能堆在导航里，而是让用户从创作目标出发，快速选择适合的生成方式。', 'Rather than stacking features in navigation, start from the creation goal and choose the right generation mode.')} className="bilus-reference-section">
          <div className="bilus-journey-list">{[
            ['01', '文生图 / TEXT TO IMAGE', '从一句描述开始，快速生成概念、风格和视觉方向。'],
            ['02', '图生图 / IMAGE TO IMAGE', '保留构图和主体关系，继续探索风格、材质与变体。'],
            ['03', '视频生成 / IMAGE TO VIDEO', '把静态画面延展成镜头、运动和叙事片段。'],
            ['04', '3D 建模 / TEXT TO 3D', '从概念进入模型、材质和可继续编辑的 3D 资产。'],
          ].map(([number, title, detail]) => <article key={number}><div><span>{number}</span><small>MODE</small></div><h3>{title}</h3><strong>{localized(language, '输入 → 生成 → 继续编辑', 'Input → generate → keep editing')}</strong><p>{detail}</p></article>)}</div>
        </ReferenceSection>
        <ReferenceSection number="03" eyebrow="WORKFLOW / 生成工作流" title="让一次生成，真正走到可交付。" intro={localized(language, '围绕 AI 生成产品的真实任务，把提示词、参考素材、生成队列、版本和导出收进同一条流程。', 'For real AI production work, prompt, reference, queue, versions, and export belong to one continuous flow.')} className="bilus-reference-section bilus-workspace-section">
          <div className="bilus-workspace-callout"><span className="reference-label">CREATION LOOP</span><strong>{localized(language, '提示词 / 参考图 / 生成队列 / 版本 / 导出', 'PROMPT / REFERENCE / QUEUE / VERSIONS / EXPORT')}</strong></div>
          <div className="bilus-state-row">{states.map((state) => <article key={state.label.zh}><span className={`bilus-state-dot is-${state.tone}`} /><strong>{t(state.label)}</strong><p>{t(state.note)}</p></article>)}</div>
        </ReferenceSection>
        <ReferenceSection number="04" eyebrow="WORKSPACE / 工作台系统" title="高密度工具，也要让人知道下一步。" intro={localized(language, '工作台用侧栏承载项目和模型，用主区承载画布与结果，用右侧面板承载参数、版本和交付动作。', 'The workspace uses a sidebar for projects and models, a main canvas for results, and a right panel for parameters, versions, and delivery.')} className="bilus-reference-section">
          <div className="bilus-system-grid">{systemLayers.map((layer, index) => <article key={layer.name.zh}><div className="reference-system-icon"><NarrativeIcon icon={layer.icon} /></div><span>0{index + 1}</span><h3>{t(layer.name)}</h3><p>{t(layer.detail)}</p></article>)}</div>
          <div className="bilus-component-sheet"><span className="reference-label">{components.length} 个核心组件 / 多状态</span><div>{components.map((item, index) => <article key={item.name.zh}><span>{String(index + 1).padStart(2, '0')}</span><strong>{t(item.name)}</strong><small>{t(item.state)}</small></article>)}</div></div>
        </ReferenceSection>
        <ReferenceSection number="05" eyebrow="DELIVERY / 交付结果" title="让创意从生成结果变成可继续使用的资产。" intro={localized(language, '设计交付不止是几张界面，而是覆盖生成状态、失败恢复、版本管理和导出交接的完整产品语言。', 'Delivery is more than screens: it includes generation states, recovery, version management, and a product language for handoff.')} className="bilus-reference-section">
          <div className="bilus-metric-row">{narrative.metrics.map((metric) => <article key={metric.label.zh}><strong>{t(metric.value)}</strong><span>{t(metric.label)}</span><p>{t(metric.detail)}</p></article>)}</div>
          <div className="bilus-evidence-list">{narrative.evidence.map((row, index) => <article key={row.before.zh}><span>0{index + 1}</span><div><strong>{t(row.before)}</strong><p>{t(row.decision)}</p></div><p>{t(row.signal)}</p></article>)}</div>
        </ReferenceSection>
        <ReferenceSection number="06" eyebrow="SUMMARY / 设计总结" title="把 AI 能力，组织成可持续创作的产品。" intro={localized(language, '毕鲁斯 3.0 的核心不是增加更多 AI 功能，而是把图像、视频和 3D 能力组织成一套用户能理解、团队能协作、结果能交付的工作台。', 'BILUS 3.0 is not about adding more AI features. It organizes image, video, and 3D capabilities into a workspace users can understand, teams can share, and results can ship.')} className="bilus-reference-section bilus-summary-section">
          <div className="bilus-summary-note"><Sparkles size={19} /><p>{language === 'en' ? study.noteEn : study.note}</p></div>
        </ReferenceSection>
      </div>
      <section className="reference-next page-padding bilus-reference-next"><Link to={`/work/${nextProject.slug}`}><span className="eyebrow">NEXT PROJECT</span><strong>{language === 'en' ? nextProject.titleEn : nextProject.title}</strong><ArrowUpRight size={22} /></Link></section>
    </main>
    <SiteFooter />
  </>
}

function BilusAiCaseDetail({ project }: { project: Project }) {
  usePageTitle(project.title)
  const { language } = useLanguage()
  const zh = language !== 'en'
  const nextProject = projects[(projects.findIndex((item) => item.slug === project.slug) + 1) % projects.length]
  const phases = zh ? [
    ['01', '拆解需求', '先把“做一个 AI 工具”拆成可讨论的问题：谁在什么场景下生成什么，结果如何继续编辑、保存和交付。', '我用 Codex 整理需求、补齐状态清单，并把模糊目标拆成创作模式、任务流和工作台三个层级。'],
    ['02', 'Figma Agent 出原型', '把需求结构转成可验证的界面骨架，再围绕输入区、生成区、结果区快速试错。', 'Figma Agent 帮我生成首轮原型，我负责校正信息优先级、交互关系和真实业务边界。'],
    ['03', 'Codex 实现与校验', '从原型到可运行页面，验证布局、状态、响应式和真实素材加载。', '我用 Codex 拆分组件、实现页面、补齐加载/错误/完成态，并在本地反复检查视觉还原。'],
    ['04', '手动调节细节', 'AI 原型和视觉方案只能提供方向，真正的页面还要回到栅格、间距、信息层级和状态细节。', '我手动调整组件尺寸、交互反馈、响应式断点和页面节奏，把生成结果收敛成可用产品。'],
    ['05', '可灵 + Codex 完成交付', '用可灵制作关键动效，再把最终动效转成稳定的 PNG 序列帧，进入页面和交付流程。', '可灵负责动效探索，Codex 负责接入、时间轴控制和 PNG 序列帧处理，保证网页端可控、可复用。'],
    ['06', '形成 AI 创作工作台', '把文生图、图生图、视频生成和 3D 建模放进一条可以追踪的产品流程。', '最终交付不只是界面，而是一套可继续扩展的工作台结构、视觉系统和动效资产。'],
  ] : [
    ['01', 'Frame the brief', 'Turn “build an AI tool” into clear questions: who generates what, in which context, and how the result continues to edit, save, and ship.', 'I used Codex to structure requirements, enumerate states, and split the goal into modes, tasks, and workspace.'],
    ['02', 'Prototype with Figma Agent', 'Translate the brief into a testable interface skeleton and iterate around input, generation, and result.', 'Figma Agent produced the first prototype pass; I corrected priority, interaction relationships, and product constraints.'],
    ['03', 'Build with Codex', 'Move from prototype to a running interface with real assets, responsive layout, and product states.', 'I used Codex to split components, implement screens, and verify loading, error, completion, and visual fidelity.'],
    ['04', 'Tune the details manually', 'AI prototypes and visual directions only set the path. The real interface still needs grid, spacing, hierarchy, and state refinement.', 'I manually tuned component dimensions, interaction feedback, responsive breakpoints, and page rhythm.'],
    ['05', 'Animate with Kling, ship with Codex', 'Use Kling for motion exploration, then convert the final motion into a stable PNG sequence for the web.', 'Kling explored the motion language; Codex handled integration, timeline control, and PNG sequence playback.'],
    ['06', 'Shape the AI workspace', 'Connect text-to-image, image-to-image, video generation, and 3D modeling into one traceable product flow.', 'The outcome is an extensible workspace structure, visual system, and motion asset pipeline, not only screens.'],
  ]
  return <>
    <main className="bilus-ai-case">
      <section className="bilus-ai-hero page-padding"><Link className="back-link" to="/work"><ArrowLeft size={16} />{zh ? '返回作品目录' : 'Back to work'}</Link><span className="eyebrow">BILUS 3.0 / AI CREATION PLATFORM</span><h1>毕鲁斯 3.0</h1><p>{zh ? '一个面向 AI 创作者的统一工作台：从提示词和参考图开始，完成生图、生视频与 3D 建模，并把结果继续编辑和交付。' : 'A unified AI creation workspace: start with prompts and references, generate images, videos, and 3D assets, then keep editing and deliver the result.'}</p><div className="bilus-ai-meta"><span>2025—2026</span><span>{zh ? 'UI 设计师 / 项目负责人' : 'UI Designer & Project Lead'}</span><span>CODEX / FIGMA AGENT / AI WORKFLOW</span></div><div className="bilus-ai-hero-media"><ReferenceArtifact project={project} label={zh ? '工作台主视觉' : 'Workspace key visual'} /></div></section>
      <section className="bilus-ai-intent"><div className="bilus-ai-inner"><span className="eyebrow">THE REAL QUESTION</span><h2>{zh ? '不是“AI 能做什么”，而是用户如何把结果做完。' : 'The question was not what AI can do, but how users finish the work.'}</h2><p>{zh ? '毕鲁斯 3.0 的改版重点，是把生成能力放进真实生产流程：输入、等待、比较、编辑、版本和导出，每一步都有明确的下一步。' : 'The redesign placed generation inside a real production flow: input, wait, compare, edit, version, and export, with a clear next action at every step.'}</p></div></section>
      <section className="bilus-ai-method"><div className="bilus-ai-inner"><div className="bilus-ai-section-head"><span className="eyebrow">MY AI WORKFLOW / 01—06</span><h2>{zh ? '我如何利用 AI 工具完成设计。' : 'How I used AI tools to do the design.'}</h2><p className="bilus-ai-method-lead">{zh ? '每个工具只承担它最擅长的一段：拆解、原型、视觉、动效和工程交付。' : 'Each tool owns one part it is good at: framing, prototyping, visuals, motion, and delivery.'}</p></div><div className="bilus-ai-tool-grid"><article><div className="bilus-ai-tool-icon"><Code2 size={22} /></div><div><strong>Codex</strong><span>{zh ? '需求拆解 / React 实现 / PNG 序列帧' : 'Brief / React / PNG sequence'}</span></div></article><article><div className="bilus-ai-tool-icon"><Palette size={22} /></div><div><strong>Figma Agent</strong><span>{zh ? '原型骨架 / 交互验证 / 页面结构' : 'Prototype / interaction / structure'}</span></div></article><article><div className="bilus-ai-tool-icon"><ImageIcon size={22} /></div><div><strong>Image 2.5</strong><span>{zh ? '视觉方向 / 首屏氛围 / 结果探索' : 'Visual directions / hero / result'}</span></div></article><article><div className="bilus-ai-tool-icon"><Clapperboard size={22} /></div><div><strong>{zh ? '可灵' : 'Kling'}</strong><span>{zh ? '动效探索 / 节奏测试 / 动画参考' : 'Motion / pacing / animation reference'}</span></div></article></div><div className="bilus-ai-phase-list">{phases.map(([number, title, summary, detail]) => <article key={number}><span className="bilus-ai-phase-number">{number}</span><div><h3>{title}</h3><p>{summary}</p><strong>{detail}</strong></div></article>)}</div></div></section>
      <section className="bilus-ai-screens"><div className="bilus-ai-inner"><div className="bilus-ai-section-head"><span className="eyebrow">PRODUCT STRUCTURE</span><h2>{zh ? '从工具集合，变成可理解的创作路径。' : 'From a tool collection to an understandable creation path.'}</h2></div><div className="bilus-ai-mode-grid"><article><span>01</span><h3>{zh ? '输入与参考' : 'Input & reference'}</h3><p>{zh ? '提示词、参考图、比例、风格和模型选择被组织在同一入口。' : 'Prompts, references, ratio, style, and model choice share one entry.'}</p></article><article><span>02</span><h3>{zh ? '生成与反馈' : 'Generate & feedback'}</h3><p>{zh ? '队列、进度、失败原因和重试路径让等待变得可理解。' : 'Queue, progress, failure cause, and retry make waiting legible.'}</p></article><article><span>03</span><h3>{zh ? '结果与交付' : 'Result & delivery'}</h3><p>{zh ? '版本、对比、继续编辑、导出和分享形成后续工作。' : 'Versions, compare, edit, export, and share carry the work forward.'}</p></article></div><div className="bilus-ai-product-board"><div><span className="eyebrow">WORKSPACE LOGIC</span><strong>PROMPT / IMAGE / VIDEO / 3D</strong></div><div className="bilus-ai-board-lines"><i /><i /><i /><i /></div></div></div></section>
      <section className="bilus-ai-motion"><div className="bilus-ai-inner"><div className="bilus-ai-section-head"><span className="eyebrow">MOTION PIPELINE / KLING → CODEX</span><h2>{zh ? '可灵负责探索，Codex 负责把动效变成可交付资产。' : 'Kling explores the motion. Codex turns it into a shippable asset.'}</h2></div><div className="bilus-ai-motion-flow"><div><span>01</span><strong>KLING</strong><p>{zh ? '探索光束、生成反馈和结果出现的动效节奏。' : 'Explore beam, generation feedback, and result-reveal timing.'}</p></div><ArrowRight size={22} /><div><span>02</span><strong>PNG SEQUENCE</strong><p>{zh ? '把动效拆成稳定的序列帧，控制帧率和文件体积。' : 'Convert the motion into a stable PNG sequence with controlled rate and size.'}</p></div><ArrowRight size={22} /><div><span>03</span><strong>CODEX</strong><p>{zh ? '接入页面时间轴，处理播放、暂停、降级和响应式。' : 'Integrate playback, pause, fallback, and responsive behavior through Codex.'}</p></div></div></div></section>
      <section className="bilus-ai-result"><div className="bilus-ai-inner"><span className="eyebrow">RESULT / REFLECTION</span><h2>{zh ? 'Codex 让我更快落地，Figma Agent 让我更快验证。' : 'Codex helped me ship faster. Figma Agent helped me validate faster.'}</h2><p>{zh ? '这次改版让我形成了一套更稳定的 AI 设计工作流：先用 AI 拆解和生成可能性，再由设计判断收敛结构，最后用 Codex 把方案变成可运行、可验证的产品。' : 'This redesign shaped a more stable AI design workflow: use AI to open possibilities, use design judgment to converge the structure, then use Codex to make it runnable and verifiable.'}</p><Link className="button button-primary" to={`/work/${nextProject.slug}`}>{zh ? '查看下一个项目' : 'View next project'} <ArrowUpRight size={16} /></Link></div></section>
    </main><SiteFooter />
  </>
}

function ProjectDetail({ project }: { project: Project }) {
  if (project.slug === 'bilus-3') return <BilusAiCaseDetail project={project} />
  if (project.slug === 'aojin-ai') return <AojinReferenceDetail project={project} />
  if (project.slug === 'qiaxu-ai') return <ReferenceCaseDetail project={project} />
  if (project.slug === 'wowo') return <WowoEditorialDetail project={project} />
  return <StandardProjectDetail project={project} />
}

function StandardProjectDetail({ project }: { project: Project }) {
  usePageTitle(project.title)
  const { language } = useLanguage()
  const t = (copy: DualCopy) => copy[language]
  const nextProject = projects[(projects.findIndex((item) => item.slug === project.slug) + 1) % projects.length]
  const study = caseStudies[project.slug]
  const narrative = caseNarratives[project.slug]
  const components = narrative.components ?? reusableComponents
  const states = narrative.states ?? stateShowcase
  const scope = language === 'en' ? (project.scopeEn ?? project.scope) : project.scope
  const process = language === 'en' ? study.processEn : study.process
  const [activeSection, setActiveSection] = useState('problem')
  const [readingProgress, setReadingProgress] = useState(0)
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({ problem: false, process: true, product: true, performance: true, perspective: true })
  const foldItems = [
    { id: 'problem', label: dual('问题', 'Problem') },
    { id: 'process', label: dual('过程', 'Process') },
    { id: 'product', label: dual('产品', 'Product') },
    { id: 'performance', label: dual('表现', 'Performance') },
    { id: 'perspective', label: dual('观点', 'Perspective') },
  ]
  const collapsedClass = foldItems.filter((item) => collapsedSections[item.id]).map((item) => `is-${item.id}-collapsed`).join(' ')
  const scrollToCaseSection = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.case-p-section'))
    if (!sections.length) return
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      if (visible[0]?.target instanceof HTMLElement) setActiveSection(visible[0].target.id)
    }, { rootMargin: '-18% 0px -58% 0px', threshold: [0.08, 0.25, 0.55] })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [project.slug])

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setReadingProgress(scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0)
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.cancelAnimationFrame(frame)
    }
  }, [project.slug])
  const fiveP = [
    { number: '01', name: dual('问题', 'PROBLEM'), share: '15%', id: 'problem' },
    { number: '02', name: dual('过程', 'PROCESS'), share: '20%', id: 'process' },
    { number: '03', name: dual('产品', 'PRODUCT'), share: '50%', id: 'product' },
    { number: '04', name: dual('表现', 'PERFORMANCE'), share: '10%', id: 'performance' },
    { number: '05', name: dual('观点', 'PERSPECTIVE'), share: '05%', id: 'perspective' },
  ]

  return <>
    <main className={`case-page case-page-${project.slug}`}>
      <div className="case-reading-progress" aria-hidden="true"><span style={{ transform: `scaleX(${readingProgress})` }} /></div>
      <section className={`case-hero case-hero-${project.tone} page-padding`}>
        <Reveal>
          <Link className="back-link" to="/work"><ArrowLeft size={16} />{localized(language, '返回作品目录', 'Back to work')}</Link>
          <span className="eyebrow">{project.english}</span>
          <h1>{language === 'en' ? project.titleEn : project.title}<span className="title-dot">.</span></h1>
          <div className="case-meta"><span>{project.year}</span><span>{project.roleEn ?? project.role}</span></div>
          <p className="case-lead">{localized(language, project.intro, project.introEn)}</p>
          <div className="case-actions">{project.external && <ButtonLink to={project.external} external variant="primary">{localized(language, '访问线上产品', 'Open live product')}</ButtonLink>}<ButtonLink to="/contact" variant="glass">{localized(language, '聊聊这个项目', 'Discuss this project')}</ButtonLink></div>
        </Reveal>
      </section>

      <section className={`case-media case-media-${project.slug} page-padding`}><Reveal><ProjectVisual project={project} detail /></Reveal></section>

      <section className={`case-method case-method-${project.slug} page-padding`} aria-labelledby="case-method-title">
        <div className="case-method-copy"><span className="eyebrow">CASE LOGIC / 5P</span><h2 id="case-method-title">{localized(language, '把做过的事，讲成一条可验证的路径。', 'Turn the work into a path that can be understood and tested.')}</h2><p>{localized(language, 'Problem 定义困境，Process 解释推导，Product 展示方案，Performance 给出证据，Perspective 留下下一步。', 'Problem frames the tension, Process shows the reasoning, Product carries the work, Performance gives evidence, and Perspective points forward.')}</p></div>
        <nav className="case-p-grid" aria-label={localized(language, '作品集结构', 'Case study structure')}>
          {fiveP.map((item) => <button type="button" className={activeSection === item.id ? 'is-active' : ''} key={item.id} onClick={() => scrollToCaseSection(item.id)}><span className="case-p-number">{item.number}</span><strong>{t(item.name)}</strong><small>{item.share}</small><ArrowRight size={14} /></button>)}
        </nav>
      </section>

      <section className={`case-content case-content-${project.slug} page-padding`}>
        <aside className="case-sidebar"><span className="eyebrow">THE WORK</span><span className="case-sidebar-line" /><span className="case-sidebar-label">{project.number} / 04</span><span className="case-sidebar-note">{localized(language, '方法论版', 'METHOD EDITION')}</span></aside>
        <div className="case-fold-controls" aria-label={localized(language, '折叠详情段落', 'Collapse case sections')}>
          <span className="eyebrow">{localized(language, '展开需要阅读的部分', 'OPEN WHAT YOU NEED')}</span>
          <div className="case-fold-list">
            {foldItems.map((item) => {
              const isCollapsed = collapsedSections[item.id]
              return <button type="button" className={isCollapsed ? 'is-collapsed' : 'is-open'} aria-expanded={!isCollapsed} key={item.id} onClick={() => { setCollapsedSections((current) => ({ ...current, [item.id]: !current[item.id] })); window.setTimeout(() => scrollToCaseSection(item.id), 0) }}><span>{item.id === 'problem' ? '01' : item.id === 'process' ? '02' : item.id === 'product' ? '03' : item.id === 'performance' ? '04' : '05'}</span>{t(item.label)}<ChevronDown size={15} /></button>
            })}
          </div>
        </div>
        <div className={`case-body ${collapsedClass}`}>
          <Reveal><section className="case-block case-overview case-p-section" id="problem"><span className="eyebrow">01 / PROBLEM · 15%</span><h2>{t(narrative.problemTitle)}</h2><p>{t(narrative.problemBody)}</p><div className="problem-points">{narrative.problemPoints.map((point, index) => <div key={point.zh}><span>0{index + 1}</span><p>{t(point)}</p></div>)}</div><div className="case-hypothesis"><span className="case-hypothesis-mark"><CircleDot size={15} /></span><div><small>{localized(language, '设计假设 / HYPOTHESIS', 'DESIGN HYPOTHESIS')}</small><p>{t(narrative.hypothesis)}</p></div></div></section></Reveal>

          <Reveal delay={80}><section className="case-block case-journey case-p-section" id="process"><span className="eyebrow">02 / PROCESS · 20%</span><div className="case-section-intro"><h2>{localized(language, '用户旅程地图', 'User journey map')}</h2><p>{localized(language, '按“发现需求 → 选方案 → 用产品 → 获反馈 → 分享”串联界面，每个节点都有清晰的设计目标。', 'The interface follows discover → choose → use → feedback → share, with a design goal at every step.')}</p></div><div className="journey-track">{narrative.journey.map((step, index) => <article className="journey-step" key={step.stage.zh}><div className="journey-step-top"><span>0{index + 1}</span><small>{t(step.stage)}</small></div><h3>{t(step.title)}</h3><strong>{t(step.goal)}</strong><p>{t(step.detail)}</p>{index < narrative.journey.length - 1 && <ArrowRight className="journey-arrow" size={16} aria-hidden="true" />}</article>)}</div><div className="process-steps case-process-inline">{process.map(([title, copy], index) => <div key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></section></Reveal>

          <Reveal delay={140}><section className="case-block case-product case-p-section" id="product"><span className="eyebrow">03 / PRODUCT · 50%</span><div className="case-section-intro"><h2>{localized(language, '从原子到页面，建立可复用的系统。', 'From atoms to pages, build a reusable system.')}</h2><p>{t(narrative.systemSummary)}</p></div><div className="scope-grid case-scope-grid">{scope.map((item) => <div key={item}><span className="scope-line" />{item}</div>)}</div><div className="system-layers">{systemLayers.map((layer, index) => <article className="system-layer" key={layer.name.zh}><div className="system-layer-icon"><NarrativeIcon icon={layer.icon} /></div><span>0{index + 1}</span><h3>{t(layer.name)}</h3><p>{t(layer.detail)}</p></article>)}</div><div className="component-matrix"><div className="component-matrix-head"><div><span className="eyebrow">REUSABLE KIT</span><h3>{localized(language, `${components.length} 个项目组件，覆盖关键状态。`, `${components.length} project components, key states covered.`)}</h3></div><span className="component-count">{String(components.length).padStart(2, '0')} / {String(components.length).padStart(2, '0')}</span></div><div className="component-grid">{components.map((item, index) => <div className="component-item" key={item.name.zh}><span>{String(index + 1).padStart(2, '0')}</span><strong>{t(item.name)}</strong><small>{t(item.state)}</small></div>)}</div></div><div className="state-showcase"><div className="state-showcase-head"><span className="eyebrow">STATE COVERAGE</span><p>{localized(language, '只展示当前项目实际需要的首用、日常、异常和完成状态。', 'Show the first-use, daily, error, and completion states this project actually needs.')}</p></div><div className="state-grid">{states.map((item) => <article className={`state-card state-card-${item.tone}`} key={item.label.zh}><div className="state-card-signal">{item.tone === 'danger' ? <CircleAlert size={15} /> : item.tone === 'active' ? <CircleCheck size={15} /> : <CircleDot size={15} />}</div><strong>{t(item.label)}</strong><p>{t(item.note)}</p></article>)}</div></div><div className="scene-section"><div className="scene-section-head"><span className="eyebrow">SCENE STRATEGY</span><p>{localized(language, '场景决定信息密度、字号和反馈方式。', 'Scene determines density, type scale, and feedback.')}</p></div><div className="scene-grid">{narrative.scenes.map((scene) => <article className="scene-card" key={scene.scene.zh}><span>{t(scene.scene)}</span><h3>{t(scene.strategy)}</h3><p>{t(scene.reason)}</p></article>)}</div></div><div className="emotion-section"><div className="emotion-section-head"><span className="eyebrow">EMOTIONAL DESIGN</span><p>{localized(language, '每个视觉和交互决策，都对应一个情感目的。', 'Every visual and interaction decision has an emotional purpose.')}</p></div><div className="emotion-grid">{narrative.emotion.map((item) => <article className="emotion-card" key={item.layer.zh}><span>{t(item.layer)}</span><h3>{t(item.title)}</h3><p><b>{localized(language, '决策', 'Decision')}</b>{t(item.decision)}</p><p><b>{localized(language, '目的', 'Purpose')}</b>{t(item.purpose)}</p></article>)}</div></div></section></Reveal>

          <Reveal delay={200}><section className="case-block case-performance case-p-section" id="performance"><span className="eyebrow">04 / PERFORMANCE · 10%</span><div className="case-section-intro"><h2>{localized(language, '让结果成为证据。', 'Make the result evidence.')}</h2><p>{localized(language, '有数据就追踪上线表现，没有数据就明确测试样本、观察节点和下一轮验证方式。', 'When launch data exists, track it. When it does not, make the sample, observation, and next validation explicit.')}</p></div><div className="metric-grid">{narrative.metrics.map((metric) => <article className="metric-card" key={metric.label.zh}><strong>{t(metric.value)}</strong><span>{t(metric.label)}</span><p>{t(metric.detail)}</p></article>)}</div><div className="evidence-table" role="table" aria-label={localized(language, '设计证据对比', 'Design evidence comparison')}><div className="evidence-row evidence-head" role="row"><span>{localized(language, '问题信号', 'Signal')}</span><span>{localized(language, '设计决策', 'Decision')}</span><span>{localized(language, '验证结果', 'Evidence')}</span></div>{narrative.evidence.map((row) => <div className="evidence-row" role="row" key={row.before.zh}><p>{t(row.before)}</p><p>{t(row.decision)}</p><p>{t(row.signal)}</p></div>)}</div></section></Reveal>

          <Reveal delay={260}><section className="case-block case-perspective case-p-section" id="perspective"><span className="eyebrow">05 / PERSPECTIVE · 05%</span><div className="perspective-panel"><Sparkles size={20} strokeWidth={1.4} /><div><h2>{localized(language, '把经验带到下一次。', 'Carry the learning forward.')}</h2><p>{t(narrative.perspective)}</p></div></div><div className="case-note"><span className="eyebrow">A NOTE FROM THE PROJECT</span><p>{language === 'en' ? study.noteEn : study.note}</p></div></section></Reveal>
        </div>
      </section>

      <section className="next-project page-padding"><Link to={`/work/${nextProject.slug}`}><span className="eyebrow">NEXT PROJECT</span><strong>{language === 'en' ? nextProject.titleEn : nextProject.title}</strong><ArrowUpRight size={24} /></Link></section>
    </main>
    <SiteFooter />
  </>
}

function AboutPage() {
  usePageTitle('关于我')
  const { language } = useLanguage()
  const timeline = language === 'en'
    ? [
        ['2025.11 — NOW', 'Shenzhen Artificial Intelligence Technology Co., Ltd.', 'UI Designer & Project Lead. Independently delivered QIA XU AI and AOJIN AI B2B projects; led the full BILUS Tool 3.0 update across home, workspace, AI features, components, interaction flows, and visual rules.'],
        ['2025.07 — 2025.10', 'AI Aesthetic Data Labeling Project', 'Data Labeling Lead. Coordinated a 200+ person team, establishing labeling standards, task scheduling, and review rituals to deliver projects ahead of schedule.'],
        ['2022.01 — 2025.07', 'Miaomen Studio', 'UI Designer. Led end-to-end design for consumer apps, mini programs, and cultural tourism collaborations, from discovery through high-fidelity delivery and launch QA.'],
      ]
    : [
        ['2025.11 — 至今', '深圳市人工智能科技有限公司', 'UI 设计师 / 项目负责人。独立完成恰序 AI、奥锦装修 AI 等 B 端项目；全面更新毕鲁斯工具端 3.0，负责首页、工作台、AI 功能、组件系统、交互流程与视觉规范。'],
        ['2025.07 — 2025.10', 'AI 美学数据标注项目', '数据标注负责人。统筹超过 200 人团队，建立标注标准、任务调度和复盘机制，推动项目提前交付。'],
        ['2022.01 — 2025.07', '喵们工作室', 'UI 设计师。负责 C 端 APP、小程序和文旅合作项目的全流程设计，从需求拆解到高保真交付和上线走查。'],
      ]
  return <><main className="inner-page"><section className="inner-hero about-hero page-padding"><Reveal><span className="eyebrow">ABOUT CHEN XING</span><h1>DESIGN INTO<br /><em>PRODUCT.</em></h1><p>{localized(language, '我是一名 UI 设计师，也负责把复杂的 AI 产品从概念推进到可以使用、可以协作、可以持续更新的状态。', 'I am a UI designer who moves complex AI products from concept to usable, collaborative, and continuously improving experiences.')}</p></Reveal></section><section className="about-content page-padding"><Reveal className="about-statement"><p className="english-title">WORK EXPERIENCE</p></Reveal><div className="timeline">{timeline.map(([date, company, copy]) => <div className="timeline-item" key={date}><span>{date}</span><div><h2>{company}</h2><p>{copy}</p></div></div>)}</div></section></main><SiteFooter /></>
}

const wechatQrModules = Array.from({ length: 21 * 21 }, (_, index) => {
  const row = Math.floor(index / 21)
  const col = index % 21
  const inFinder = (originRow: number, originCol: number) => {
    const r = row - originRow
    const c = col - originCol
    return r >= 0 && r < 7 && c >= 0 && c < 7 && (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4))
  }
  if (inFinder(0, 0) || inFinder(0, 14) || inFinder(14, 0)) return true
  if (row === 6 || col === 6) return (row * 3 + col * 5) % 2 === 0
  return ((row * 17 + col * 31 + row * col * 7) % 11) < 5
})

function WechatQr({ heading = 'WECHAT / XX030428', prompt = '扫码添加微信' }: { heading?: string; prompt?: string }) {
  return (
    <div className="wechat-qr-popover" role="tooltip">
      <strong>{heading}</strong>
      <div className="wechat-qr-grid" aria-hidden="true">
        {wechatQrModules.map((filled, index) => <span key={index} className={filled ? 'is-filled' : ''} />)}
      </div>
      <small>{prompt}</small>
    </div>
  )
}

function ContactPage() {
  usePageTitle('联系')
  const { language } = useLanguage()
  const [copied, setCopied] = useState(false)
  const email = '3068332110@qq.com'
  async function copyEmail() {
    try { await navigator.clipboard.writeText(email); setCopied(true); window.setTimeout(() => setCopied(false), 1800) } catch { window.location.href = `mailto:${email}` }
  }
  return <><main className="inner-page contact-page"><section className="inner-hero page-padding"><Reveal><span className="eyebrow">CONTACT / SHENZHEN</span><h1>HAVE A PRODUCT?<br /><em>LET'S TALK.</em></h1><p>{localized(language, '如果你正在做 AI 工具、复杂工作台或需要重新整理视觉系统，欢迎通过邮件、电话或微信联系我。', 'If you are building an AI tool, complex workspace, or visual system that needs clarity, I would love to hear from you.')}</p></Reveal></section><section className="contact-grid page-padding"><Reveal className="contact-primary"><span className="eyebrow">EMAIL</span><a href={`mailto:${email}`} className="contact-email">{email}</a><button className="copy-button" onClick={copyEmail}>{copied ? <><Check size={16} />{localized(language, '已复制', 'Copied')}</> : <><Copy size={16} />{localized(language, '复制邮箱', 'Copy email')}</>}</button></Reveal><div className="contact-list"><Reveal delay={80}><a href="tel:17363679491" className="contact-row"><span><Phone size={19} />{localized(language, '电话', 'Phone')}</span><strong>173 6367 9491</strong><ArrowUpRight size={18} /></a></Reveal><Reveal delay={140}><div className="contact-row contact-wechat-row" tabIndex={0} aria-label={localized(language, '微信 xx030428，悬停查看二维码', 'WeChat xx030428, hover to view QR code')}><span><span className="wechat-icon">微</span>{localized(language, '微信', 'WeChat')}</span><strong>xx030428</strong><span className="contact-row-muted">{localized(language, '可添加沟通', 'Available to chat')}</span><WechatQr /></div></Reveal><Reveal delay={200}><a href={RESUME_URL} download className="contact-row"><span><Download size={19} />{localized(language, '简历', 'Resume')}</span><strong>{localized(language, '下载 PDF 简历', 'Download PDF resume')}</strong><ArrowUpRight size={18} /></a></Reveal></div></section></main><SiteFooter /></>
}

function useEnglishTitles(path: string) {
  useEffect(() => {
    const setTitle = (selector: string, text: string) => {
      const element = document.querySelector<HTMLElement>(selector)
      if (!element) return
      element.classList.add('english-title')
      element.setAttribute('aria-label', text)
    }

    setTitle('.hero-copy h1', 'CHEN XING / UI DESIGNER · AI PRODUCT LEAD')
    setTitle('.works-section .section-heading-row h2', 'SELECTED WORK')
    setTitle('.capability-section h2', 'DESIGN AS PRODUCT STRUCTURE.')
    setTitle('.footer-main h2', 'MAKE COMPLEX PRODUCTS CLEAR.')
    if (path === '/work') setTitle('.inner-hero h1', 'SELECTED WORK')
    if (path === '/about') setTitle('.inner-hero h1', 'DESIGN INTO PRODUCT')
    if (path === '/contact') setTitle('.inner-hero h1', "LET'S TALK")
    const caseTitle = document.querySelector<HTMLElement>('.case-hero h1')
    if (caseTitle) {
      const project = projects.find((item) => path === `/work/${item.slug}`)
      if (project) setTitleForElement(caseTitle, project.titleEn)
    }
    const nextTitles: Record<string, string> = {
      '/work/bilus-3': 'AOJIN AI',
      '/work/aojin-ai': 'QIA XU AI',
      '/work/qiaxu-ai': 'WOWO',
      '/work/wowo': 'BILUS 3.0',
    }
    if (nextTitles[path]) setTitle('.next-project strong', nextTitles[path])
  }, [path])
}

function setTitleForElement(element: HTMLElement, text: string) {
  element.classList.add('english-title')
  element.setAttribute('aria-label', text)
}

function App() {
  const location = useLocation()
  const [language, setLanguage] = useState<Language>(() => (window.localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'zh'))
  const path = location.pathname.replace(/\/$/, '') || '/'
  useEnglishTitles(path)
  const detailSlug = path.startsWith('/work/') ? path.slice('/work/'.length) : ''
  const detailProject = useMemo(() => projects.find((project) => project.slug === detailSlug), [detailSlug])
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])
  useEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN'
    document.body.classList.toggle('language-en', language === 'en')
    window.localStorage.setItem('portfolio-language', language)
  }, [language])
  let page: React.ReactNode
  if (path === '/') page = <HomePage />
  else if (path === '/work') page = <WorkPage />
  else if (detailProject) page = <ProjectDetail project={detailProject} />
  else if (path === '/about') page = <AboutPage />
  else if (path === '/contact') page = <ContactPage />
  else page = <WorkPage />
  const toggleLanguage = () => setLanguage((current) => current === 'zh' ? 'en' : 'zh')
  return <LanguageContext.Provider value={{ language, toggleLanguage }}><div className="app-shell"><SiteLoader /><SiteHeader />{page}</div></LanguageContext.Provider>
}

export default App
