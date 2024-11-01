
type Developer = {
    name: string,
    skillLevel: number,
    maxHours: number,
    preferredTaskType: string,
    assignedTasks?: string[],
    totalHours?: number
}

type Task = {

    taskName: string,
    difficulty: number,
    hoursRequired: number,
    taskType: string,
    priority: number,
    dependencies: string[]
}

function assignTasksWithPriorityAndDependencies(developers:Developer[], tasks:Task[]) {
    const taskQueue = [...tasks].sort((a, b) => b.priority - a.priority); 
    
    const output = developers.map(dev => ({
      name: dev.name,
      skillLevel: dev.skillLevel,
      maxHours: dev.maxHours,
      preferredTaskType: dev.preferredTaskType,
      assignedTasks: [],
      totalHours: 0
    }));
    
    function canAssignTask(task:Task, assignedTasks:string[]) {
      return task.dependencies.every(dep => assignedTasks.indexOf(dep) !== -1);
    }
  
    function findSuitableDeveloper(task:Task) {
      let bestFit: typeof output[0] | null = null;
  
      output.forEach(dev => {
        if (
          dev.skillLevel >= task.difficulty && 
          dev.maxHours - dev.totalHours >= task.hoursRequired && 
          (dev.preferredTaskType === task.taskType || !bestFit || dev.preferredTaskType === task.taskType) 
        ) {
          if (!bestFit || (dev.preferredTaskType === task.taskType && bestFit.preferredTaskType !== task.taskType)) {
            bestFit = dev;
          }
        }
      });
  
      return bestFit;
    }
    
    const assignedTasks: string[] = [];
    const unassignedTasks: Task[] = [];

    taskQueue.forEach(task => {
        if (canAssignTask(task, assignedTasks)) {
            const dev:Developer = findSuitableDeveloper(task) as unknown as Developer;
            if (dev) {
                console.log (`task ${task.taskName} dev ${dev.name}`);
            if (!dev.assignedTasks) {
                dev.assignedTasks = [];
            }
            dev.assignedTasks.push(task.taskName);
            dev.totalHours = (dev.totalHours || 0) + task.hoursRequired;
            assignedTasks.push(task.taskName);
            } else {
            unassignedTasks.push(task);
            }
        } else {
            unassignedTasks.push(task);
        }
        });
    
    return { developers: output, unassignedTasks };
  }
  
  const developers:Developer[] = [
    { name: 'Alice', skillLevel: 7, maxHours: 40, preferredTaskType: 'feature' },
    { name: 'Bob', skillLevel: 9, maxHours: 30, preferredTaskType: 'bug' },
    { name: 'Charlie', skillLevel: 5, maxHours: 35, preferredTaskType: 'refactor' },
  ];
  
  const tasks:Task[] = [
    { taskName: 'Feature A', difficulty: 7, hoursRequired: 15, taskType: 'feature', priority: 4, dependencies: [] },
    { taskName: 'Bug Fix B', difficulty: 5, hoursRequired: 10, taskType: 'bug', priority: 5, dependencies: [] },
    { taskName: 'Refactor C', difficulty: 9, hoursRequired: 25, taskType: 'refactor', priority: 3, dependencies: ['Bug Fix B'] },
    { taskName: 'Optimization D', difficulty: 6, hoursRequired: 20, taskType: 'feature', priority: 2, dependencies: [] },
    { taskName: 'Upgrade E', difficulty: 8, hoursRequired: 15, taskType: 'feature', priority: 5, dependencies: ['Feature A'] },
  ];
  
  console.log(assignTasksWithPriorityAndDependencies(developers, tasks));
  
