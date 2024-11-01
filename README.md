# Task Scheduler

Approach
Sort and Prepare Tasks:

 - Sort tasks by priority (high to low) to ensure higher-priority tasks are allocated first.
 - Also sort by dependencies, so dependent tasks are only scheduled once prerequisites are complete.
Check Dependencies:

For each task, verify if its dependencies are completed before assigning it to a developer.
Assign Tasks:

For each developer, check if they can take on a task based on:
 - Their skillLevel vs. task difficulty.
 - Their maxHours vs. hoursRequired for the task.
 - Their preferredTaskType to prioritize their preferred types of tasks.
 - Assign tasks to developers with balanced workload, respecting each developer’s capacity.
Return Results:

Output the list of developers with their assigned tasks and total work hours.
List any tasks that couldn’t be assigned.
# How to run 
`tsc index.ts && node index.js` 

