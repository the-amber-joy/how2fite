import sql from './db'

export interface Part {
  id: number
  name: string
}

// get all actions
export async function list() {
  return await sql<Part[]>`
    SELECT id, name FROM part
    ORDER BY id
  `
}

