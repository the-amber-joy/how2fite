import sql from './db'

export interface Action {
  id: number
  name: string
}

// get all actions
export async function list() {
  return await sql<Action[]>`
    SELECT id, name FROM action
    ORDER BY id
  `
}

