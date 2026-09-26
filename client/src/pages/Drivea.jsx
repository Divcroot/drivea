import { useNavigate, useParams } from "react-router-dom"
import FileGrid from "../components/files/FileGrid"
import Breadcrumbs from "../components/layout/Breadcrumbs"
import { useEffect, useState } from "react"
import { useDrive } from "../hooks/useDrive"
import { useApp } from "../context/AppContext"
import FilePreview from "../components/files/FilePreview"
import ShareModal from "../components/files/ShareModal"
import RenameModal from "../components/files/RenameModal"
import MoveModal from "../components/files/MoveModal"
import { ConfirmDialog } from "../components/ui/ConfirmDialog"

const Drivea = () => {

  const navigate = useNavigate()

  const { folderId } = useParams()

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

  const handleConfirmDelete = async () => {
    if (!deleteItem) return

    await removeDriveItem(deleteItem)

    setDeleteItem(null)
  }

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

      {/* Modals */}

      {previewFile && <FilePreview
        file={previewFile}
        onClose={() => setPreviewFile(null)}
      />}

      {shareItem && <ShareModal
        item={shareItem}
        isOpen={!!shareItem}
        onClose={() => setShareItem(null)}
      />}

      {renameItem && <RenameModal
        item={renameItem}
        isOpen={!!renameItem}
        onClose={() => setRenameItem(null)}
      />}

      {moveItem && <MoveModal
        item={moveItem}
        isOpen={!!moveItem}
        onClose={() => setMoveItem(null)}
      />}

      {deleteItem && <ConfirmDialog
        title={`Move ${deleteItem.name} to Trash?`}
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleConfirmDelete}
        message="You can restore this item from Trash any time."
        confirmText="Move to Trash"
      />}

    </div>
  )
}

export default Drivea