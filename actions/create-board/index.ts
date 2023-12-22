"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"
import { db } from "@/lib/db"
import { createSafeAction } from "@/lib/create-safe-action"

import { CreateBoard } from "./schema"
import { InputType, ReturnType } from "./types"

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: "Unauthorized"
    }
  }

  const { title, image } = data

  const [
    imgId,
    imgThumbUrl,
    imgFullUrl,
    imgUserName,
    imgLinkHTML] = image.split("|")

  if (!imgId || !imgThumbUrl || !imgFullUrl || !imgUserName || !imgLinkHTML) {
    return {
      error: "Invalid Image"
    }
  }
  let board;

  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imgId,
        imgThumbUrl,
        imgFullUrl,
        imgUserName,
        imgLinkHTML
      }
    })
  } catch (error) {
    return {
      error: "Failed to create"
    }
  }

  revalidatePath(`/organization/org_2ZckEJ80dtPc9mxLcuIRzCa9tDa`)
  return { data: board }
}

export const createBoard = createSafeAction(CreateBoard, handler)