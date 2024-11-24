export function InformationNotification({ message, open, closeConfirmation }) {
  return (
    <>
      {open && (
        <div className="border-1-4 border-yellow-400 bg-yellow-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg aria-hidden="true" className="size-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">{message} </p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  onClick={closeConfirmation}
                  className="text-yellow-400 hover:text-yellow-500 inline-flex rounded-md p-1.5 focus:outline-none focus:ring-yellow-600"
                >
                  <span className="sr-only">Close</span>
                  <svg aria-hidden="true" className="size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
