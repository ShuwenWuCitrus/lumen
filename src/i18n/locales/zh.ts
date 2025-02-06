export default {
  nav: {
    home: "首页",
    tasks: "任务",
    notes: "记录",
    community: "交流",
  },
  home: {
    welcome: "欢迎来到 Lumen",
    description: "一个帮助 ADHD 用户管理任务、记录思绪、找到共鸣的平台",
    startButton: "开启旅程",
    taskCard: {
      title: "任务管理",
      description: "简单直观的任务管理，帮助你专注于最重要的事情",
    },
    noteCard: {
      title: "记录思绪",
      description: "记录你的想法和感受，追踪情绪变化",
    },
    communityCard: {
      title: "寻找共鸣",
      description: "加入充满理解和支持的社区，分享你的故事",
    },
    moodTracking: {
      title: "追踪你的旅程",
      description: "了解你的模式，庆祝你的进步",
      features: [
        {
          icon: "📊",
          title: "可视化情绪模式",
          description: "通过精美的可视化看见你的情绪旅程",
        },
        {
          icon: "🎯",
          title: "每日反思",
          description: "通过引导式每日签到建立自我认知",
        },
        {
          icon: "✨",
          title: "庆祝进步",
          description: "记录你的成就，看见自己的成长",
        },
      ],
    },
    communityStories: {
      title: "社区故事",
      roles: {
        advocate: "ADHD 倡导者",
        creative: "创意工作者",
        student: "学生",
        professional: "职场人士",
        parent: "家长",
      },
    },
  },
  tasks: {
    title: "今日任务",
    addPlaceholder: "添加新任务...",
    addButton: "添加",
    remainingTasks: "今日还可添加 {count} 个任务",
    maxTasksWarning: "为了避免压力过大，每天最多添加3个未完成的任务",
    completed: "已完成",
    suggestStepButton: "✨ 帮我找个切入点！",
    redecomposeButton: "🔄 换个方式试试！",
    suggestError: "获取建议时出错了，请稍后再试",
    generatingLabel: "生成中...",
    selectStepPrompt: "哪一个看起来最容易开始呢？",
    regenerateSteps: "✨ 再给我一些建议",
    confirmStep: "🎯 就从这里开始！",
    selectStepFirst: "选一个最适合你的切入点吧！",
    replaceStepConfirm: "要不要试试其他开始方式？",
    showMoreButton: "显示更多 ({count} 个)",
    showLessButton: "收起",
    taskDeleted: "任务已删除",
    undoButton: "撤销",
    stepCompleted: "步骤完成！✨",
    completeStep: "✓ 完成这一步",
    whatNext: "干得好！接下来想做什么？",
    suggestNextStep: "✨ 建议下一步",
    doneForNow: "👍 先到这里",
    stepLabel: "步骤 {number}",
    skipButton: "跳过此步骤",
    doneButton: "完成任务",
    stepProgress: "{current} / {total}",
    taskCompleted: "所有步骤已完成！",
  },
  notes: {
    title: "记录思绪",
    moods: {
      procrastination: "拖延大师上线",
      distracted: "被一只蝴蝶带走了注意力",
      hyperfocus: "进入时间黑洞",
      anxious: "心里有只仓鼠在狂奔",
      energetic: "燃到起飞",
    },
    addPlaceholder: "✨ 随便写点什么...",
    addButton: "记录下来",
    searchPlaceholder: "🔍 搜索笔记...",
    allMoods: "全部心情",
    selectMood: "你现在的心情是？",
    content: "有什么想法？",
    saving: "保存中...",
    writeFirst: "写下第一个想法吧！",
    confirmDelete: "确定要删除这条笔记吗？",
    noSearchResults: "没有找到匹配的笔记",
    cancel: "取消",
    save: "保存",
    edit: "编辑",
    delete: "删除",
    analysis: {
      sevenDays: "情绪分布（近7天）",
      thirtyDays: "情绪分布（近30天）",
      aiSummary: "AI情绪总结",
      keywords: "情绪关键词",
      reanalyze: "重新分析",
      days: "天",
      analyzing: "正在分析你的情绪变化...",
      needMore:
        "再记录 {required} 条笔记就能看到情绪分析啦（当前 {current} 条）",
      initialHint: "记录 {count} 条笔记即可解锁 AI 情绪分析功能！",
      advice: "给你的建议",
    },
  },
  community: {
    title: "社区交流",
    namePlaceholder: "你的昵称...",
    contentPlaceholder: "分享你的故事...",
    postButton: "发布",
    categories: {
      all: "全部",
      tips: "小贴士",
      support: "互助",
      questions: "问答",
      victories: "小胜利",
      resources: "资源",
    },
    actions: {
      like: "点赞",
      comment: "评论",
      share: "分享",
    },
  },
  footer: {
    about: "关于我们",
    guide: "使用指南",
    privacy: "隐私政策",
    sections: {
      quickLinks: {
        title: "快速链接",
        features: "功能介绍",
        resources: "资源",
        blog: "博客",
      },
      support: {
        title: "支持",
        helpCenter: "帮助中心",
        guidelines: "社区准则",
        terms: "服务条款",
      },
      connect: {
        title: "关注我们",
        twitter: "Twitter",
        instagram: "Instagram",
        linkedin: "LinkedIn",
      },
    },
    copyright: "© 2024 Lumen. 保留所有权利。",
    slogan: "通过正念科技赋能神经多样性群体",
  },
  common: {
    save: "保存",
    cancel: "取消",
    clear: "清除",
    loading: "加载中...",
    error: "出错了",
    success: "成功",
  },
} as const;
