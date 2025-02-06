export default {
  nav: {
    home: "Home",
    tasks: "Tasks",
    notes: "Notes",
    community: "Community",
  },
  home: {
    welcome: "Welcome to Lumen",
    description:
      "A platform helping ADHD users manage tasks, record thoughts, and find resonance",
    taskCard: {
      title: "Task Management",
      description:
        "Simple and intuitive task management to help you focus on what matters",
    },
    noteCard: {
      title: "Record Thoughts",
      description: "Record your thoughts and feelings, track emotional changes",
    },
    communityCard: {
      title: "Find Resonance",
      description: "Join a supportive community and share your story",
    },
  },
  tasks: {
    title: "Today's Tasks",
    addPlaceholder: "Add new task...",
    addButton: "Add",
    remainingTasks: "Can add {count} more tasks today",
    maxTasksWarning: "To avoid overwhelm, limit of 3 active tasks per day",
    completed: "Completed",
    decomposeButton: "Break Down",
    redecomposeButton: "🔄 Let's Try Another Way!",
    decomposeError: "Failed to break down task, please try again later",
    showMoreButton: "Show {count} more",
    showLessButton: "Show less",
    suggestStepButton: "✨ Help Me Start!",
    tryAnotherButton: "Not Sure? Try Another",
    suggestError: "Failed to get suggestion, please try again later",
    firstStepLabel: "Step 1",
    generatingLabel: "Generating...",
    tryAnotherShort: "Try Another",
    doneButton: "Complete task",
    skipButton: "Skip this step",
    nextStepLabel: "Next Step",
    taskCompleted: "All steps completed!",
    stepLabel: "Step {number}",
    suggestionLabel: "Suggestion",
    gotItButton: "Got It",
    taskDeleted: "Task deleted",
    undoButton: "Undo",
    selectStepPrompt: "Which of these feels most doable right now?",
    regenerateSteps: "✨ Show Me More Options",
    confirmStep: "🎯 Let's Start Here!",
    selectStepFirst: "Pick one that feels right for you!",
    replaceStepConfirm: "Want to explore different ways to start?",
    stepCompleted: "Step completed!",
    completeStep: "Complete step",
    whatNext: "Great job! What would you like to do next?",
    suggestNextStep: "✨ Suggest Next Step",
    doneForNow: "👍 Done for Now",
    stepProgress: "{current} / {total}",
  },
  notes: {
    title: "Record Thoughts",
    moods: {
      procrastination: "Procrastination Level 100",
      distracted: "Oh look, a squirrel!",
      hyperfocus: "Lost in the Flow",
      anxious: "Brain Hamster on a Wheel",
      energetic: "Rocket Mode Activated",
    },
    addPlaceholder: "Write your thoughts...",
    addButton: "Record",
    searchPlaceholder: "Search notes...",
    allMoods: "All Moods",
    selectMood: "How are you feeling?",
    content: "What's on your mind?",
    saving: "Saving...",
    writeFirst: "Write your first thought!",
    confirmDelete: "Are you sure you want to delete this note?",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    analysis: {
      sevenDays: "Mood Distribution (Last 7 Days)",
      thirtyDays: "Mood Distribution (Last 30 Days)",
      aiSummary: "AI Emotional Summary",
      keywords: "Emotional Keywords",
      reanalyze: "Reanalyze",
      days: "days",
      analyzing: "Analyzing your emotional patterns...",
      needMore:
        "Write {required} more notes to see your emotional analysis (currently {current})",
      initialHint:
        "Write {count} notes to unlock AI-powered emotional analysis!",
      advice: "Suggestions for You",
    },
  },
  community: {
    title: "Community",
    namePlaceholder: "Your nickname...",
    contentPlaceholder: "Share your story...",
    postButton: "Post",
  },
  footer: {
    about: "About Us",
    guide: "User Guide",
    privacy: "Privacy Policy",
  },
  common: {
    save: "Save",
    cancel: "Cancel",
  },
} as const;
