import { useEffect, useState, type ReactNode } from 'react'
import { ArrowLeft, ArrowUpRight, Image as ImageIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import './qiaxu-case.css'

type Language = 'zh' | 'en'
type Copy = { zh: string; en: string }

const chapters = [
  { id: 'qx-context', zh: '项目背景', en: 'Context' },
  { id: 'qx-requirements', zh: '需求拆解', en: 'Requirements' },
  { id: 'qx-entry', zh: '任务入口', en: 'Entry points' },
  { id: 'qx-feedback', zh: '状态反馈', en: 'Feedback' },
  { id: 'qx-components', zh: '组件规则', en: 'Components' },
  { id: 'qx-flow', zh: '核心流程', en: 'Task flow' },
  { id: 'qx-delivery', zh: '交付验证', en: 'Delivery' },
  { id: 'qx-reflection', zh: '项目反思', en: 'Reflection' },
]

function EvidenceSlot({ label, caption, language, ratio = '16 / 10' }: { label: string; caption?: string; language: Language; ratio?: string }) {
  return <figure className="qx-evidence">
    <div className="qx-evidence-rectangle" style={{ aspectRatio: ratio }} role="img" aria-label={`${label} · ${language === 'zh' ? '图片占位' : 'Image placeholder'}`}>
      <ImageIcon size={26} strokeWidth={1.25} aria-hidden="true" />
      <span>{label}</span>
      <small>{language === 'zh' ? '图片占位' : 'IMAGE PLACEHOLDER'}</small>
    </div>
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
}

function CaseSection({ id, number, eyebrow, title, lead, children }: { id: string; number: string; eyebrow: string; title: string; lead: string; children: ReactNode }) {
  return <section id={id} className="reference-section qx-section" aria-labelledby={`${id}-title`}>
    <div className="reference-section-head">
      <span className="reference-section-number">{number}</span>
      <div><span className="eyebrow">{eyebrow}</span><h2 id={`${id}-title`}>{title}</h2><p>{lead}</p></div>
    </div>
    <div className="reference-section-content qx-section-content">{children}</div>
  </section>
}

function DecisionRows({ rows, language }: { rows: { label: Copy; body: Copy }[]; language: Language }) {
  return <dl className="qx-decision-rows">{rows.map((row) => <div key={row.label.en}><dt>{row.label[language]}</dt><dd>{row.body[language]}</dd></div>)}</dl>
}

export default function QiaxuCaseContent({ language, year, heroMedia }: { language: Language; year: string; heroMedia: ReactNode }) {
  const copy = (zh: string, en: string) => language === 'en' ? en : zh
  const [activeChapter, setActiveChapter] = useState(chapters[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible[0]) setActiveChapter(visible[0].target.id)
    }, { rootMargin: '-18% 0px -55% 0px', threshold: 0 })
    chapters.forEach(({ id }) => { const section = document.getElementById(id); if (section) observer.observe(section) })
    return () => observer.disconnect()
  }, [])

  const jumpToChapter = (id: string) => {
    setActiveChapter(id)
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
  }

  return <main className="reference-case reference-case-qiaxu-ai qx-case">
    <section className="reference-hero">
      <div className="reference-hero-top page-padding"><Link className="back-link" to="/work"><ArrowLeft size={16} />{copy('返回作品目录', 'Back to work')}</Link><span>03 / 04</span></div>
      <div className="reference-hero-copy page-padding">
        <span className="eyebrow">QIA XU / AI DESIGN WORKFLOWS</span>
        <h1>{copy('恰序 AI', 'QIA XU AI')}<small>PRODUCT STRUCTURE / INTERACTION / DELIVERY</small></h1>
        <p className="qx-hero-statement">{copy('围绕四类 AI 任务，建立清楚的入口、操作流程与反馈。', 'Clear entry points, flows, and feedback for four AI tasks.')}</p>
        <p>{copy('从任务差异出发，组织功能入口和页面结构；用状态规则与组件规范，连接需求、设计与研发协作。', 'Start with the differences between tasks, organize entry points and screens, then connect requirements, design, and engineering with shared state and component rules.')}</p>
        <div className="reference-meta"><span>{year}</span><span>{copy('UI 设计师 / 项目负责人', 'UI Designer / Project Lead')}</span><span>{copy('B 端 AI 产品', 'B2B AI PRODUCT')}</span></div>
      </div>
      <div className="reference-hero-art">{heroMedia}</div>
    </section>

    <nav className="qx-chapters page-padding" aria-label={copy('案例章节', 'Case chapters')}>
      {chapters.map((chapter, index) => <button type="button" key={chapter.id} aria-current={activeChapter === chapter.id ? 'location' : undefined} onClick={() => jumpToChapter(chapter.id)}><span>{String(index + 1).padStart(2, '0')}</span>{chapter[language]}</button>)}
    </nav>

    <div className="reference-body">
      <CaseSection id="qx-context" number="01" eyebrow="CONTEXT / ROLE" title={copy('多种 AI 能力，需要清楚的任务结构。', 'Different AI capabilities need clear task structure.')} lead={copy('恰序 AI 面向设计与业务团队，整合标准生图、智能生图、图片标注和算量报价等功能。', 'QIA XU AI serves design and business teams with image generation, smart generation, image annotation, and quantity estimation.')}>
        <div className="qx-context-columns">
          <div className="qx-prose"><h3>{copy('项目背景', 'Product context')}</h3><p>{copy('四类功能对输入材料和结果呈现有不同要求。用户需要先判断使用哪项功能，再理解需要提供什么，以及完成后如何查看结果。设计工作的起点，是与产品团队对齐各项任务的目标、输入和结果。', 'Each task has different input and output requirements. Users need to choose a function, understand what to provide, and review the result. I started by aligning the goal, input, and output of each task with product.')}</p></div>
          <div className="qx-prose"><h3>{copy('我的职责', 'My responsibilities')}</h3><p>{copy('我作为 UI 设计师与项目负责人，参与需求讨论，梳理任务与页面结构，完成交互、视觉和组件规范，并与产品、研发协作推进设计交付与开发走查。AI 处理能力与业务规则由团队共同对齐。', 'As UI designer and project lead, I joined requirements discussions, mapped tasks and screens, and delivered interaction design, visuals, and component rules. I worked with product and engineering on handoff and implementation review; AI capabilities and business rules were aligned with the team.')}</p></div>
        </div>
        <div className="qx-scope"><span>{copy('需求与任务梳理', 'Requirements')}</span><span>{copy('交互与视觉设计', 'Interaction & visuals')}</span><span>{copy('组件与状态规范', 'Components & states')}</span><span>{copy('设计交付与走查', 'Handoff & review')}</span></div>
        <EvidenceSlot language={language} label={copy('产品全景与四类任务入口', 'Product overview and four task entry points')} caption={copy('产品结构', 'Product structure')} ratio="16 / 9" />
      </CaseSection>

      <CaseSection id="qx-requirements" number="02" eyebrow="REQUIREMENTS / DESIGN GOALS" title={copy('先区分任务差异，再确定共用结构。', 'Separate task differences, then define shared structure.')} lead={copy('我从任务入口、操作过程和页面一致性三个问题出发，梳理页面结构与设计目标。', 'I framed the design around task selection, the operating flow, and consistency across screens.')}>
        <ol className="qx-requirement-list">
          <li><span>01</span><div><h3>{copy('选对任务', 'Choose the task')}</h3><p>{copy('用户如何区分四类功能，并进入适合当前目标的任务？入口名称、层级与对应页面需要保持一致。', 'How can users distinguish the four functions and choose the one that fits their goal? Names, hierarchy, and destination screens need to align.')}</p></div></li>
          <li><span>02</span><div><h3>{copy('理解过程', 'Understand the flow')}</h3><p>{copy('每项任务需要哪些输入？处理中、完成和异常如何表达？输入、反馈与结果需要能够连续衔接。', 'What does each task need? How are processing, completion, and errors expressed? Inputs, feedback, and results need to connect.')}</p></div></li>
          <li><span>03</span><div><h3>{copy('保持一致', 'Maintain consistency')}</h3><p>{copy('哪些组件与状态规则可以共用，哪些输入和结果必须保留差异？相同组件在不同页面应具有相同含义。', 'Which components and states can be shared, and which inputs and results need to differ? Shared components should mean the same thing across screens.')}</p></div></li>
        </ol>
        <EvidenceSlot language={language} label={copy('任务目标、输入与结果对照', 'Task goals, inputs, and outputs')} caption={copy('需求拆解', 'Requirements mapping')} ratio="2 / 1" />
        <p className="qx-verification">{copy('这些目标用于检查设计方案；实际使用是否更高效，需要通过任务测试与使用反馈验证。', 'These goals guide design review. Task tests and usage feedback are needed to validate efficiency in practice.')}</p>
      </CaseSection>

      <CaseSection id="qx-entry" number="03" eyebrow="DECISION 01 / TASK ENTRY" title={copy('按任务组织入口。', 'Organize entry points by task.')} lead={copy('让用户先确定要完成的任务，再进入对应操作。', 'Let users choose a task before entering its controls.')}>
        <DecisionRows language={language} rows={[
          { label: { zh: '问题', en: 'Problem' }, body: { zh: '四类功能的输入与结果存在差异。入口与任务关系不清楚时，用户需要额外判断当前功能是否适用。', en: 'The tasks have different inputs and outputs. Unclear entry points make users spend extra effort deciding whether a function fits.' } },
          { label: { zh: '设计选择', en: 'Decision' }, body: { zh: '按任务类型组织入口，使名称、层级与对应页面保持一致；进入功能后，再呈现该任务需要的输入内容与必要选项。', en: 'Group entry points by task, align names and hierarchy with their screens, then present the inputs and options needed for that task.' } },
          { label: { zh: '取舍', en: 'Trade-off' }, body: { zh: '保留任务差异，同时让入口承担解释功能的责任。相近任务的命名需要足够明确，分类本身不能替代用户理解。', en: 'Preserving task differences puts more responsibility on the entry points. Similar tasks need clear names; classification alone does not ensure understanding.' } },
          { label: { zh: '验证方向', en: 'Validation' }, body: { zh: '观察用户是否理解标准生图与智能生图等相近功能的区别，以及是否发生误选。', en: 'Observe whether users understand similar functions, such as image generation and smart generation, and whether they choose the wrong task.' } },
        ]} />
        <EvidenceSlot language={language} label={copy('功能入口与任务页面对应关系', 'Entry points and their task screens')} caption={copy('任务入口 · 信息层级与命名', 'Task entry · hierarchy and naming')} />
      </CaseSection>

      <CaseSection id="qx-feedback" number="04" eyebrow="DECISION 02 / STATE FEEDBACK" title={copy('沿输入、处理、结果设计反馈。', 'Connect input, processing, and results.')} lead={copy('让页面在任务执行前后保持连续。', 'Keep the experience continuous before and after processing.')}>
        <DecisionRows language={language} rows={[
          { label: { zh: '问题', en: 'Problem' }, body: { zh: 'AI 任务包含提交与等待过程。界面需要说明输入要求、处理状态、结果是否就绪，以及异常后如何继续。', en: 'AI tasks involve submission and waiting. The interface needs to explain input requirements, processing, result readiness, and recovery.' } },
          { label: { zh: '设计选择', en: 'Decision' }, body: { zh: '以“输入—处理—结果”为共同主线，整理初始、处理中、异常和完成状态，并给出对应的操作方向。', en: 'Use input, processing, and result as the shared flow. Define initial, processing, error, and completed states, with a clear action for each.' } },
          { label: { zh: '取舍', en: 'Trade-off' }, body: { zh: '统一状态含义与反馈规则，图像、标注和报价结果保留各自的内容结构。', en: 'Share state meanings and feedback rules while preserving the structures needed for images, annotations, and estimates.' } },
          { label: { zh: '验证方向', en: 'Validation' }, body: { zh: '结合实际实现和测试记录，检查用户能否识别任务状态、完成异常恢复，以及是否重复提交。', en: 'Use implementation review and tests to check state recognition, error recovery, and repeated submissions.' } },
        ]} />
        <div className="qx-evidence-grid qx-evidence-grid-four">
          {[copy('输入状态', 'Input'), copy('AI 处理中', 'Processing'), copy('任务异常', 'Error'), copy('结果就绪', 'Result ready')].map((label) => <EvidenceSlot key={label} language={language} label={label} ratio="4 / 3" />)}
        </div>
      </CaseSection>

      <CaseSection id="qx-components" number="05" eyebrow="DECISION 03 / COMPONENT RULES" title={copy('统一组件规则，保留业务差异。', 'Share component rules, preserve task differences.')} lead={copy('相同操作保持一致，不同结果使用适合各自任务的结构。', 'Keep shared actions consistent and let task-specific results keep their own structure.')}>
        <DecisionRows language={language} rows={[
          { label: { zh: '问题', en: 'Problem' }, body: { zh: '功能导航、图片上传、需求描述、任务选项和主操作，在多个任务中承担相近作用；结果内容则因任务而异。', en: 'Navigation, uploads, descriptions, options, and primary actions have similar roles across tasks. Result content differs by task.' } },
          { label: { zh: '设计选择', en: 'Decision' }, body: { zh: '整理共用组件、视觉规范与适用状态；图像预览、图片标注和报价结果保留对应的内容结构。', en: 'Define shared components, visual rules, and applicable states while keeping the structures needed for image preview, annotation, and estimates.' } },
          { label: { zh: '取舍', en: 'Trade-off' }, body: { zh: '规范为设计交付和研发讨论提供共同依据，统一的范围以实际任务需要为边界。', en: 'Rules provide a shared reference for design handoff and engineering discussion. The extent of reuse follows actual task needs.' } },
          { label: { zh: '验证方向', en: 'Validation' }, body: { zh: '检查组件在真实页面中的使用方式与状态含义是否一致。组件数量不能直接证明开发效率提升。', en: 'Check whether component behavior and state meanings stay consistent in real screens. Component count alone does not establish engineering efficiency.' } },
        ]} />
        <div className="qx-evidence-grid"><EvidenceSlot language={language} label={copy('组件变体与状态规范', 'Component variants and states')} /><EvidenceSlot language={language} label={copy('共用组件在不同任务中的应用', 'Shared components across task screens')} /></div>
      </CaseSection>

      <CaseSection id="qx-flow" number="06" eyebrow="PRODUCT / COMPLETE TASK FLOW" title={copy('从选择功能，到查看结果。', 'From choosing a function to reviewing its result.')} lead={copy('沿一项任务的连续操作，检查入口、输入、反馈与结果如何衔接。', 'Follow one continuous task to see how entry, input, feedback, and results connect.')}>
        <ol className="qx-flow-steps">{[
          [copy('选择功能', 'Choose'), copy('找到适合当前目标的任务。', 'Find the task that fits the goal.')],
          [copy('准备输入', 'Prepare'), copy('补充素材、描述与必要选项。', 'Add materials, descriptions, and options.')],
          [copy('提交处理', 'Process'), copy('确认任务状态与异常恢复方向。', 'Recognize processing and recovery paths.')],
          [copy('查看结果', 'Review'), copy('理解结果，识别后续操作。', 'Review the result and the next action.')],
        ].map(([title, body], index) => <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{body}</p></li>)}</ol>
        <EvidenceSlot language={language} label={copy('同一任务的完整操作流程', 'One complete task flow')} caption={copy('功能入口 → 输入准备 → AI 处理 → 结果查看', 'Entry → input → processing → result')} ratio="2 / 1" />
      </CaseSection>

      <CaseSection id="qx-delivery" number="07" eyebrow="DELIVERY / VERIFICATION" title={copy('以交付范围说明结果，以记录验证落地。', 'Show the delivery scope and verify the implementation.')} lead={copy('我的工作覆盖四类任务的入口与流程、交互与视觉、组件与状态规范，以及交付沟通和开发走查。', 'My work covered task entry and flows, interaction and visual design, component and state rules, handoff, and implementation review.')}>
        <div className="qx-delivery-list">
          <div><h3>{copy('设计交付', 'Design delivery')}</h3><p>{copy('任务流程、页面设计、组件变体与状态规范，说明设计覆盖范围。', 'Task flows, screens, component variants, and states establish the scope of design work.')}</p></div>
          <div><h3>{copy('实现对照', 'Implementation review')}</h3><p>{copy('同一功能与状态的设计稿、实现画面和走查记录，用于检查界面规则的落地情况。', 'Matched design and implementation screens, with review records, help check which rules reached the product.')}</p></div>
          <div><h3>{copy('使用验证', 'Usage validation')}</h3><p>{copy('任务选择、输入理解、异常恢复和任务完成效率，是后续需要验证的重点。', 'Task selection, input comprehension, error recovery, and completion efficiency remain priorities for validation.')}</p></div>
        </div>
        <div className="qx-evidence-grid"><EvidenceSlot language={language} label={copy('设计稿', 'Design file')} caption={copy('同一功能 / 同一状态', 'Same function / same state')} /><EvidenceSlot language={language} label={copy('实现画面', 'Implementation')} caption={copy('对应设计稿的实现对照', 'Implementation matched to the design')} /></div>
        <EvidenceSlot language={language} label={copy('问题记录与修复对照', 'Review issues and fixes')} caption={copy('开发走查', 'Implementation review')} ratio="2 / 1" />
        <p className="qx-verification">{copy('当前结果以设计交付范围为依据；使用效果需要由实际测试与数据进一步验证。', 'The outcome is described through design delivery. Usage effects require further tests and data.')}</p>
      </CaseSection>

      <CaseSection id="qx-reflection" number="08" eyebrow="REFLECTION / NEXT VALIDATION" title={copy('让任务差异与界面一致性同时成立。', 'Make task differences and interface consistency work together.')} lead={copy('恰序项目让我把需求讨论、流程设计、视觉表达与研发协作连接起来。', 'QIA XU connected requirements, flows, visual design, and engineering collaboration.')}>
        <div className="qx-prose qx-reflection-copy"><p>{copy('相近的操作可以共用规则，业务目标不同的任务则需要保留输入与结果的差异。后续，我会围绕任务选择、输入准备、处理反馈和结果使用收集具体反馈，并据此调整命名、提示与页面结构。每次调整都应回到一个明确的问题，以及可以检查的界面变化。', 'Similar actions can share rules; tasks with different business goals need different inputs and outputs. Next, I will collect feedback on selection, input preparation, processing, and result use to refine naming, guidance, and screen structure. Each change should connect to a clear problem and an observable interface change.')}</p></div>
      </CaseSection>
    </div>
    <section className="reference-next page-padding"><Link to="/work/wowo"><span className="eyebrow">NEXT PROJECT</span><strong>{copy('窝喔', 'WOWO')}</strong><ArrowUpRight size={22} /></Link></section>
  </main>
}
