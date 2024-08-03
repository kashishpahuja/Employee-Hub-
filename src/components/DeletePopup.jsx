import React from 'react'

function DeletePopup() {
  return (
    <div>
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => setShowModal(true)}
    >
      Launch demo modal
    </button>

    {/* Modal */}
    <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden={!showModal}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
            <button
              type="button"
              className="close"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            ...
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default DeletePopup