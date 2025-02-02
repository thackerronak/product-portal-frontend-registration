import { createAsyncThunk, Dispatch } from '@reduxjs/toolkit'
import documentSlice from './slice'
import { Api } from './api'
import { DocumentType } from './types'
import { ProgressType } from '../../../types/MainTypes'

const handleUpdateProgress = (
  progress: ProgressType,
  dispatch: Dispatch,
  temporaryId: string
) => {
  const { loaded, total } = progress
  const percentageProgress = Math.floor((loaded / total) * 100)
  dispatch(
    documentSlice.actions.updateProgressBar({ temporaryId, percentageProgress })
  )
}

const fetchDocuments = createAsyncThunk(
  'registration/application/user/fetchDocuments',
  async (applicationId: string) => {
    try {
      return await Api.getInstance().getDocuments(
        applicationId,
        DocumentType.COMMERCIAL_REGISTER_EXTRACT
      )
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('Unable to load documents. Please contact the administrator.')
    }
  }
)

const saveDocument = createAsyncThunk(
  `registration/application/companyDetailsWithAddress/save`,
  async (
    {
      applicationId,
      document,
      temporaryId,
    }: {
      applicationId: string
      document: File
      temporaryId: string
    },
    { dispatch }
  ) => {
    try {
      return await Api.getInstance().postDocument({
        applicationId,
        documentTypeId: DocumentType.COMMERCIAL_REGISTER_EXTRACT,
        file: document,
        handleUpdateProgress,
        dispatch,
        temporaryId,
      })
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('Unable to save documents. Please contact the administrator.')
    }
  }
)

const deleteDocument = createAsyncThunk(
  `registration/application/document/delete`,
  async (documentId: string) => {
    try {
      return await Api.getInstance().deleteDocument(documentId)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error(
        'Unable to delete documents. Please contact the administrator.'
      )
    }
  }
)

export { fetchDocuments, saveDocument, deleteDocument }
