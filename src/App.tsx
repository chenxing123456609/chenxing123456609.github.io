import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  ExternalLink,
  Languages,
  Mail,
  Menu,
  MoveUpRight,
  Phone,
  Play,
  X,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const BILUS_URL = 'https://www.aigcacs.com/inspiration'
const RESUME_URL = '/media/Chen-Xing-UI-Designer-Resume-2026.pdf'
const LOADING_VIDEO_URL = '/media/loading-animation.mp4'

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
  const loaderRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'exiting' | 'done'>('loading')

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--loader-pointer-x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--loader-pointer-y', `${event.clientY - rect.top}px`)
    event.currentTarget.style.setProperty('--loader-pointer-opacity', '1')
  }

  const handlePointerLeave = () => {
    loaderRef.current?.style.setProperty('--loader-pointer-opacity', '0')
  }

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
      document.body.classList.remove('is-loading')
    }
  }, [loaderExitDuration, loaderPlaybackDuration])

  if (phase === 'done') return null
  return (
    <div ref={loaderRef} className={`site-loader ${phase === 'exiting' ? 'is-exiting' : ''}`} role="status" aria-live="polite" aria-label={`页面加载 ${progress}%`} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      <video ref={videoRef} className="site-loader-video" src={LOADING_VIDEO_URL} autoPlay muted playsInline preload="auto" aria-hidden="true" />
      <div className="site-loader-shade" aria-hidden="true" />
      <svg className="site-loader-filter-defs" aria-hidden="true" focusable="false"><defs><filter id="site-loader-water-filter" x="-15%" y="-25%" width="130%" height="150%"><feTurbulence type="fractalNoise" baseFrequency=".012 .055" numOctaves="2" seed="7" result="water-noise"><animate attributeName="baseFrequency" dur="7s" values=".012 .055;.02 .075;.012 .055" repeatCount="indefinite" /></feTurbulence><feDisplacementMap in="SourceGraphic" in2="water-noise" scale="15" xChannelSelector="R" yChannelSelector="B" /></filter></defs></svg>
      <div className="site-loader-water-surface" aria-hidden="true"><span className="site-loader-pointer-ripple" /><span className="site-loader-water-line" /></div>
      <div className="site-loader-glass-top" aria-hidden="true">
        <div className="site-loader-portfolio site-loader-portfolio-base">PORTFOLIO</div>
        <div className="site-loader-portfolio site-loader-portfolio-water">PORTFOLIO</div>
        <div className="site-loader-top-meta"><span>CHEN XING</span><span>SELECTED WORK / 2026</span></div>
      </div>
      <span className="site-loader-label">LOADING / CHEN XING PORTFOLIO</span>
      <div className="site-loader-progress"><span className="site-loader-progress-kicker">LOADING INDEX</span><div className="site-loader-progress-number"><strong>{String(progress).padStart(2, '0')}</strong><span>%</span></div></div>
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
          <a className="button button-primary" href="mailto:3068332110@qq.com">{localized(language, '联系我', 'Contact me')} <ArrowUpRight size={17} /></a>
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
  if (project.slug === 'bilus-3' && detail) return <div className="bilus-detail-media"><img src="/media/bilus-detail.png" alt={localized(language, '毕鲁斯 3.0 产品界面', 'BILUS 3.0 product interface')} loading="eager" decoding="async" /></div>
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
  { icon: '/icons/jianying.ico', name: '剪映', detail: 'VIDEO / EDITING' },
]

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
                <div className="experience-column-top"><span>0{index + 1}</span><span>{item.date}</span></div>
                <div className="experience-column-main">
                  <div className="experience-field experience-field-role">
                    <span className="experience-field-label">{localized(language, '01 / 担任职务', '01 / ROLE')}</span>
                    <h3>{item.role}</h3>
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

function ProjectDetail({ project }: { project: Project }) {
  usePageTitle(project.title)
  const { language } = useLanguage()
  const nextProject = projects[(projects.findIndex((item) => item.slug === project.slug) + 1) % projects.length]
  const study = caseStudies[project.slug]
  const scope = language === 'en' ? (project.scopeEn ?? project.scope) : project.scope
  const process = language === 'en' ? study.processEn : study.process
  return <><main className="case-page"><section className={`case-hero case-hero-${project.tone} page-padding`}><Reveal><Link className="back-link" to="/work"><ArrowLeft size={16} />{localized(language, '返回作品目录', 'Back to work')}</Link><span className="eyebrow">{project.english}</span><h1>{language === 'en' ? project.titleEn : project.title}<span className="title-dot">.</span></h1><div className="case-meta"><span>{project.year}</span><span>{project.roleEn ?? project.role}</span></div><p className="case-lead">{localized(language, project.intro, project.introEn)}</p><div className="case-actions">{project.external && <ButtonLink to={project.external} external variant="primary">{localized(language, '访问线上产品', 'Open live product')}</ButtonLink>}<ButtonLink to="/contact" variant="glass">{localized(language, '聊聊这个项目', 'Discuss this project')}</ButtonLink></div></Reveal></section><section className="case-media page-padding"><Reveal><ProjectVisual project={project} detail /></Reveal></section><section className="case-content page-padding"><div className="case-sidebar"><span className="eyebrow">THE WORK</span><span className="case-sidebar-line" /><span className="case-sidebar-label">{project.number} / 04</span></div><div className="case-body"><Reveal><div className="case-block case-overview"><span className="eyebrow">OVERVIEW</span><h2>{language === 'en' ? study.overviewTitleEn : study.overviewTitle}<br /><em>{language === 'en' ? study.overviewTitleAccentEn : study.overviewTitleAccent}</em></h2><p>{language === 'en' ? study.overviewEn : study.overview}</p></div></Reveal><Reveal delay={80}><div className="case-block"><span className="eyebrow">ROLE & SCOPE</span><div className="scope-grid">{scope.map((item) => <div key={item}><span className="scope-line" />{item}</div>)}</div></div></Reveal><Reveal delay={140}><div className="case-block case-process"><span className="eyebrow">PROCESS</span><div className="process-steps">{process.map(([title, copy], index) => <div key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></div></Reveal><Reveal delay={200}><div className="case-block case-note"><span className="eyebrow">A NOTE FROM THE PROJECT</span><p>{language === 'en' ? study.noteEn : study.note}</p></div></Reveal></div></section><section className="next-project page-padding"><Link to={`/work/${nextProject.slug}`}><span className="eyebrow">NEXT PROJECT</span><strong>{language === 'en' ? nextProject.titleEn : nextProject.title}</strong><ArrowUpRight size={24} /></Link></section></main><SiteFooter /></>
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
  return <><main className="inner-page"><section className="inner-hero about-hero page-padding"><Reveal><span className="eyebrow">ABOUT CHEN XING</span><h1>DESIGN INTO<br /><em>PRODUCT.</em></h1><p>{localized(language, '我是一名 UI 设计师，也负责把复杂的 AI 产品从概念推进到可以使用、可以协作、可以持续更新的状态。', 'I am a UI designer who moves complex AI products from concept to usable, collaborative, and continuously improving experiences.')}</p></Reveal></section><section className="about-content page-padding"><Reveal className="about-statement"><span className="eyebrow">A SHORT BIO</span><p className="english-title">OVER THE LAST FIVE YEARS, I HAVE WORKED ACROSS STUDIOS, DATA-LABELING PROJECTS, AND AI TECHNOLOGY TEAMS — BUILDING A PRACTICE AROUND PRODUCT STRUCTURE, INTERACTION FLOWS, AND VISUAL SYSTEMS.</p></Reveal><div className="timeline">{timeline.map(([date, company, copy]) => <div className="timeline-item" key={date}><span>{date}</span><div><h2>{company}</h2><p>{copy}</p></div></div>)}</div></section></main><SiteFooter /></>
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

function WechatQr() {
  return (
    <div className="wechat-qr-popover" role="tooltip">
      <div className="wechat-qr-grid" aria-hidden="true">
        {wechatQrModules.map((filled, index) => <span key={index} className={filled ? 'is-filled' : ''} />)}
      </div>
      <strong>WECHAT / XX030428</strong>
      <small>扫码添加微信</small>
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
