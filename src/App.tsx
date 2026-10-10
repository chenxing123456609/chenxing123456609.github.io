import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowUpRight, Check, Copy, Download, ExternalLink, Languages, Menu, Phone, Play, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import './portfolio-download.css'

const BILUS_URL = 'https://www.aigcacs.com/inspiration'
const RESUME_URL = '/media/Chen-Xing-UI-Designer-Resume-2026.pdf'

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
    title: '毕鲁斯2.0',
    titleEn: 'BILUS 2.0',
    english: 'BILUS TOOL / PRODUCT SYSTEM',
    year: '2025—2026',
    role: 'UI 设计师 / 项目负责人',
    roleEn: 'UI Designer & Project Lead',
    intro: 'C 端项目改版优化，通过真实用户反馈和上线数据持续迭代，推动体验提升与用户量实际增长。',
    introEn: 'A consumer product redesign validated through real user feedback and launch data, improving the experience and driving measurable user growth.',
    scope: ['官网改版', '核心体验优化', '用户路径', '视觉系统', '上线数据'],
    scopeEn: ['Website redesign', 'Core experience', 'User journeys', 'Visual system', 'Launch data'],
    cover: '/media/bilus-cover.webp',
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
    cover: '/media/aojin-cover.webp',
    video: '/media/aojin-demo.mp4',
    poster: '/media/aojin-poster.webp',
    videoLabel: '奥锦装修 AI 产品演示',
    videoLabelEn: 'AOJIN AI product demo',
    tone: 'warm',
  },
  {
    slug: 'qiaxu-ai',
    number: '03',
    title: '恰序 AI',
    titleEn: 'QIA XU AI',
    english: 'QIA XU / AI DESIGN WORKFLOWS',
    year: '2025—2026',
    role: 'UI 设计师 / 项目负责人',
    roleEn: 'UI Designer & Project Lead',
    intro: '围绕四类 AI 任务，建立清楚的入口、操作流程与反馈；通过任务差异、状态规则与组件规范，串联需求到设计交付。',
    introEn: 'Clear entry points, flows, and feedback for four AI tasks, connecting requirements to design delivery through task-specific interactions and shared component rules.',
    scope: ['需求与任务梳理', '用户流程', '交互方案', '视觉设计', '组件与状态规范'],
    scopeEn: ['Requirements and tasks', 'User flows', 'Interaction design', 'Visual design', 'Components and states'],
    cover: '/media/qiaxu-cover.webp',
    video: '/media/qiaxu-demo.mp4',
    poster: '/media/qiaxu-poster.webp',
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
    cover: '/media/wowo-cover.webp',
    video: '/media/wowo-demo.mp4',
    poster: '/media/wowo-poster.webp',
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
  'qiaxu-ai': '恰序 / B 端 AI 工具产品',
  wowo: '窝喔 / 品牌与产品视觉',
}

function localized<T>(language: Language, zh: T, en: T): T {
  return language === 'en' ? en : zh
}

type Language = 'zh' | 'en'

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

function hasSlowConnection() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string; downlink?: number } }).connection
  const poster = performance.getEntriesByType('resource').find(entry => entry.name.endsWith('/media/hero-cover-poster.webp')) as PerformanceResourceTiming | undefined
  const slowPoster = !!poster && poster.encodedBodySize > 20000 && poster.duration > 500 && poster.encodedBodySize / poster.duration < 200
  return !!connection?.saveData || /^(slow-2g|2g|3g)$/.test(connection?.effectiveType ?? '') || !!(connection?.downlink && connection.downlink < 2) || slowPoster
}

function SiteLoader() {
  const fluidCanvasRef = useRef<HTMLCanvasElement>(null)
  const [phase, setPhase] = useState<'loading' | 'exiting' | 'done'>(() => {
    const home = !window.location.hash || /^#\/(?:$|\?)/.test(window.location.hash)
    if (!home || hasSlowConnection() || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'done'
    try { return window.sessionStorage.getItem('portfolio-entered') ? 'done' : 'loading' } catch { return 'loading' }
  })

  const enterNow = () => {
    document.body.classList.remove('is-loading')
    try { window.sessionStorage.setItem('portfolio-entered', '1') } catch { /* Storage can be disabled. */ }
    window.dispatchEvent(new Event('portfolio-loader-complete'))
    setPhase('done')
  }

  useEffect(() => {
    if (phase !== 'loading') return
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
    let lastDraw = 0
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1, 960 / Math.max(rect.width, rect.height))
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    const draw = (time: number) => {
      if (time - lastDraw >= 32) {
        lastDraw = time
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
        gl.uniform1f(timeLocation, time)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      }
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
  }, [phase])

  useEffect(() => {
    if (phase === 'done') {
      document.body.classList.remove('is-loading')
      return
    }
    if (phase === 'exiting') {
      document.body.classList.remove('is-loading')
      try { window.sessionStorage.setItem('portfolio-entered', '1') } catch { /* Storage can be disabled. */ }
      window.dispatchEvent(new Event('portfolio-loader-complete'))
      const exitTimer = window.setTimeout(() => setPhase('done'), 250)
      return () => window.clearTimeout(exitTimer)
    }
    document.body.classList.add('is-loading')
    let cancelled = false
    const poster = new Image()
    let posterReady = false
    let minimumElapsed = false
    const finish = () => {
      if (!cancelled && posterReady && minimumElapsed) setPhase('exiting')
    }
    poster.onload = poster.onerror = () => { posterReady = true; finish() }
    poster.src = '/media/hero-cover-poster.webp'
    if (poster.complete) posterReady = true
    const minimumTimer = window.setTimeout(() => { minimumElapsed = true; finish() }, 350)
    // Navigation must remain usable even if the poster or network fails.
    const maximumTimer = window.setTimeout(() => { if (!cancelled) setPhase('exiting') }, 800)
    return () => {
      cancelled = true
      poster.onload = poster.onerror = null
      window.clearTimeout(minimumTimer)
      window.clearTimeout(maximumTimer)
      document.body.classList.remove('is-loading')
    }
  }, [phase])

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

function DeferredImage({ src, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLImageElement>(null)
  const [active, setActive] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (!('IntersectionObserver' in window)) { setActive(true); return }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setActive(true); observer.disconnect() }
    }, { rootMargin: '280px 0px' })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return <img {...props} ref={ref} src={active ? src : undefined} loading='lazy' decoding='async' />
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
        <DeferredImage className="intro-visual-image" src="/media/about-portrait-v2.webp" alt="" />
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
      {compact && <DeferredImage className="video-cover" src={cover ?? poster} alt="" />}
      <video ref={videoRef} src={active ? src : undefined} poster={active ? poster : undefined} muted loop playsInline controls={!compact} preload={active ? 'metadata' : 'none'} aria-label={label} />
      <div className="video-panel-bar"><span><span className="video-dot" />{label}</span><Play size={15} /></div>
    </div>
  )
}

function ProjectVisual({ project, detail = false }: { project: Project; detail?: boolean }) {
  const { language } = useLanguage()
  if (project.video) return <VideoPanel src={project.video} poster={project.poster} cover={project.cover} label={localized(language, project.videoLabel ?? `${project.title} 项目演示片段`, project.videoLabelEn ?? `${project.titleEn} product demo`)} compact={!detail} />
  if (!detail && project.cover) return <div className="video-panel is-compact static-cover"><DeferredImage className="video-cover" src={project.cover} alt="" /><div className="video-panel-bar"><span><span className="video-dot" />{localized(language, `${project.title} 项目封面`, `${project.titleEn} project cover`)}</span></div></div>
  if (project.slug === 'bilus-3' && detail) return <div className="bilus-detail-media"><img src="/media/bilus-cover.webp" alt={localized(language, '毕鲁斯2.0 产品展示图', 'BILUS 2.0 product showcase')} loading="eager" decoding="async" /></div>
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
        <div className="project-visual-caption"><span>{localized(language, '工具 / 工作台 / AI', 'TOOL / WORKBENCH / AI')}</span><strong>{localized(language, '毕鲁斯2.0', 'BILUS 2.0')}</strong></div>
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
      <a className="project-row-live" href={project.external} target="_blank" rel="noreferrer" aria-label={localized(language, '直接访问毕鲁斯2.0 网站（新窗口打开）', 'Open BILUS 2.0 website in a new window')}>
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
                    <DeferredImage src={item.src} alt="" />
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
      highlights: ['协同产品与开发推进落地，解决 20+ 处视觉与交互还原问题，上线还原度达 95%+。'],
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
      summary: '独立完成恰序 AI、奥锦装修 AI 等 B 端项目；负责毕鲁斯2.0 全面更新并落地上线。',
      highlights: ['覆盖工具首页、工作台、AI 功能、组件系统、交互流程与视觉规范。', '窝喔负责全部视觉设计，项目目前处于投资阶段。'],
    },
  ],
  en: [
    {
      date: '2022.01 — 2025.07',
      company: 'Miaomen Studio',
      role: 'UI Designer',
      summary: 'Led end-to-end UI design for consumer apps and mini programs, from discovery and user framing to high-fidelity delivery and launch QA.',
      highlights: ['Partnered with product and engineering to resolve 20+ visual and interaction gaps, reaching 95%+ launch fidelity.'],
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
      summary: 'Independently delivered QIA XU AI and AOJIN AI B2B products, and led the full BILUS 2.0 update through launch.',
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
                  <span className="experience-tool-mark" aria-hidden="true"><DeferredImage src={tool.icon} alt="" /></span>
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
  const [heroVideoActive, setHeroVideoActive] = useState(false)
  const [heroVideoPlaying, setHeroVideoPlaying] = useState(false)
  const heroVideoRef = useRef<HTMLVideoElement>(null)
  const heroSectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let timer = 0
    let ready = false
    let visible = true
    const canAnimate = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !hasSlowConnection()
    const schedule = () => {
      window.clearTimeout(timer)
      if (canAnimate() && ready && visible && !document.hidden) timer = window.setTimeout(() => {
        if (!canAnimate()) return
        setHeroVideoActive(true)
        const video = heroVideoRef.current
        if (video?.currentSrc && !video.ended) video.play().catch(() => undefined)
      }, 1200)
      else heroVideoRef.current?.pause()
    }
    const startHero = () => {
      ready = true
      schedule()
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      schedule()
    })
    if (heroSectionRef.current) observer.observe(heroSectionRef.current)
    document.addEventListener('visibilitychange', schedule)
    window.addEventListener('portfolio-loader-complete', startHero)
    if (!document.querySelector('.site-loader')) startHero()
    return () => {
      window.clearTimeout(timer)
      observer.disconnect()
      document.removeEventListener('visibilitychange', schedule)
      window.removeEventListener('portfolio-loader-complete', startHero)
    }
  }, [])

  useEffect(() => {
    if (heroVideoActive) heroVideoRef.current?.play().catch(() => undefined)
  }, [heroVideoActive])

  return (
    <>
      <main>
        <section ref={heroSectionRef} className="hero-section">
          <img className="hero-poster" src="/media/hero-cover-poster.webp" alt="" width="1800" height="1013" fetchPriority="high" decoding="async" />
          <video ref={heroVideoRef} className={`hero-video ${heroVideoPlaying ? 'is-playing' : ''}`} src={heroVideoActive ? '/media/hero-cover.mp4' : undefined} muted playsInline preload="none" onPlaying={() => setHeroVideoPlaying(true)} aria-label={localized(language, '作品集封面动态背景', 'Portfolio cover motion background')} />
          <div className="hero-shade is-visible" />
          <div className="hero-grain is-visible" />
          <div className="hero-signal is-visible" aria-hidden="true"><span /></div>
          <div className="hero-content page-padding is-visible">
            <Reveal className="hero-copy">
              <span className="eyebrow hero-eyebrow">SHENZHEN / 5 YEARS / UI DESIGN</span>
              <h1><span>CHEN XING</span><small> / UI DESIGNER · AI PRODUCT LEAD</small></h1>
              <p>{localized(language, '5年 UI 设计经验，专注 B 端 AI 产品、复杂工作台、组件系统与产品落地。', 'Five years of UI design experience focused on B2B AI products, complex workspaces, component systems, and production delivery.')}</p>
              <div className="hero-buttons"><ButtonLink to="/work">{localized(language, '查看作品', 'View selected work')}</ButtonLink><a className="button button-glass" href={RESUME_URL} download><Download size={16} />{localized(language, '下载简历', 'Download resume')}</a></div>
            </Reveal>
            <div className="hero-side-note"><span>SELECTED WORK</span><strong>01—04</strong><span>SCROLL TO EXPLORE</span></div>
          </div>
          <div className="hero-scroll is-visible"><ArrowDown size={15} /><span>{localized(language, '向下浏览', 'SCROLL DOWN')}</span></div>
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

const projectDownloads: Record<string, { file: string; name: string }> = {
  'bilus-3': { file: 'Bilus-2.0-Portfolio.pdf', name: '毕鲁斯2.0' },
  'aojin-ai': { file: 'Aojin-AI-Portfolio.pdf', name: '奥锦装修' },
  'qiaxu-ai': { file: 'Qiaxu-AI-Portfolio.pdf', name: '恰序' },
  wowo: { file: 'Wowo-Portfolio.pdf', name: '窝喔' },
}

function ProjectDetail({ project }: { project: Project }) {
  usePageTitle(project.title)
  const { language } = useLanguage()
  const document = projectDownloads[project.slug]
  return <main className="portfolio-download-page page-padding">
    <Link className="back-link" to="/work"><ArrowLeft size={16} />{localized(language, '返回作品目录', 'Back to work')}</Link>
    <Reveal className="portfolio-download-heading">
      <span className="eyebrow">{project.titleEn} / PORTFOLIO</span>
      <h1>{localized(language, project.title, project.titleEn)}</h1>
      <div className="portfolio-download-actions">
        <a className="button button-primary" href="/portfolios/Chen-Xing-Complete-Portfolio.pdf" download="陈兴完整作品集.pdf"><Download size={17} />{localized(language, '下载完整作品集 PDF', 'Download complete portfolio PDF')}</a>
        <a className="button button-glass" href={`/portfolios/${document.file}`} download={`${document.name}作品集.pdf`}><Download size={17} />{localized(language, `下载${document.name}作品集 PDF`, `Download ${project.titleEn} portfolio PDF`)}</a>
      </div>
    </Reveal>
    <Reveal className="portfolio-download-cover"><img src={project.cover} alt={localized(language, `${project.title}作品封面`, `${project.titleEn} portfolio cover`)} width="1800" height="1013" decoding="async" fetchPriority="high" /></Reveal>
    <div className="portfolio-download-colophon"><span>CHEN XING / SELECTED WORK</span><span>{project.number} / 04</span></div>
  </main>
}

function AboutPage() {
  usePageTitle('关于我')
  const { language } = useLanguage()
  const timeline = language === 'en'
    ? [
        ['2025.11 — NOW', 'Shenzhen Artificial Intelligence Technology Co., Ltd.', 'UI Designer & Project Lead. Independently delivered QIA XU AI and AOJIN AI B2B projects; led the full BILUS 2.0 update across home, workspace, AI features, components, interaction flows, and visual rules.'],
        ['2025.07 — 2025.10', 'AI Aesthetic Data Labeling Project', 'Data Labeling Lead. Coordinated a 200+ person team, establishing labeling standards, task scheduling, and review rituals to deliver projects ahead of schedule.'],
        ['2022.01 — 2025.07', 'Miaomen Studio', 'UI Designer. Led end-to-end design for consumer apps, mini programs, and product collaborations, from discovery through high-fidelity delivery and launch QA.'],
      ]
    : [
        ['2025.11 — 至今', '深圳市人工智能科技有限公司', 'UI 设计师 / 项目负责人。独立完成恰序 AI、奥锦装修 AI 等 B 端项目；全面更新毕鲁斯2.0，负责首页、工作台、AI 功能、组件系统、交互流程与视觉规范。'],
        ['2025.07 — 2025.10', 'AI 美学数据标注项目', '数据标注负责人。统筹超过 200 人团队，建立标注标准、任务调度和复盘机制，推动项目提前交付。'],
        ['2022.01 — 2025.07', '喵们工作室', 'UI 设计师。负责 C 端 APP、小程序和产品协作项目的全流程设计，从需求拆解到高保真交付和上线走查。'],
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
      '/work/wowo': 'BILUS 2.0',
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
