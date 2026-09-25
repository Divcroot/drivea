import { useNavigate, useParams } from "react-router-dom"
import FileGrid from "../components/file/FileGrid"
import Breadcrumbs from "../components/layout/Breadcrumbs"
import { useEffect, useState } from "react"
import { useDrive } from "../hooks/useDrive"
import { useApp } from "../context/AppContext"

const Drivea = () => {

  const navigate = useNavigate()

  const {folderId} = useParams()

  const { fetchDriveContent, setCurrentFolderId } = useApp()

  const { deleteItem: removeDriveItem } = useDrive()

  //Active Item Models

  const [previewFile, setPreviewFile] = useState(null)
  const [shareItem, setShareItem] = useState(null)
  const [renameItem, setRenameItem] = useState(null)
  const [moveItem, setMoveItem] = useState(null)
  const [deleteItem, setDeleteItem] = useState(null)

  useEffect(() => {
    const id = folderId || null

    setCurrentFolderId(id)

    fetchDriveContent(id)
  }, [folderId, fetchDriveContent, setCurrentFolderId])

  return (
    <div className="space-y-4">

      {/* Breadcrumbs */}

      <Breadcrumbs />

      {/* Folders & Files */}

      <FileGrid 
      onFolderClick={(folder) => navigate(`/drive/${folder.id}`)}
      onPreviewFile={setPreviewFile}
      onShareItem={setShareItem}
      onRenameItem={setRenameItem}
      onMoveItem={setMoveItem}
      onDeleteItem={setDeleteItem}
      />
    </div>
  )
}

export default Drivea