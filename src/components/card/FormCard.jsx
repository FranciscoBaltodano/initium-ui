function noop(){};

export const FormCard = ({
    title,
    updateTitle,
    description,
    updateDescription,

    loading,
    isCreating = True,

    handleCreateClick = noop,
    handleUpdateClick = noop,
    handleDeleteClick = noop,
}) => {
  return (
    <form className="max-w-96">
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          autoComplete="title"
          value={title}
          onChange={updateTitle}    
          className="border border-gray-300 rounded-lg p-2 w-full"
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="title">Description</label>
        <textarea
          id="about"
          name="about"
          className="border border-gray-300 rounded-lg p-2 w-full"
          value={description}
          onChange={updateDescription}
          disabled={loading}
        />
      </div>

      {isCreating ? (
        <div>
          <button
            disabled={loading}
            onClick={handleCreateClick}
            className="bg-blue-500 disabled:bg-blue-300 text-white rounded-lg p-2 w-full mt-5"
          >
            {loading ? "loading" : "Create"}
          </button>
        </div>
      ) : (
        <div>
          <div>
            <button
              disabled={loading}
              onClick={handleUpdateClick}
              className="bg-blue-500  disabled:bg-blue-300 text-white rounded-lg p-2 w-full mt-5"
            >
              {loading ? "loading" : "Update"}
            </button>
          </div>
          <div>
            <button
              disabled={loading}
              onClick={handleDeleteClick}
              className="bg-red-500 disabled:bg-red-300 text-white rounded-lg p-2 w-full mt-5"
            >
              {loading ? "loading" : "Delete"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
};
