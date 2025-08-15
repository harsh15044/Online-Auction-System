import React from "react";
import "./CreateAuction.css";
import { useStore } from "../store/useAuthStore";

export default function CreateAuction() {
  const currentAuction = useStore((state) => state.currentAuction);
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);
  const updateField = useStore((state) => state.updateField);
  const setLoading = useStore((state) => state.setLoading);
  const setError = useStore((state) => state.setError);
  const clearError = useStore((state) => state.clearError);
  const resetForm = useStore((state) => state.resetForm);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateField(name, value);

    if (error) {
      clearError();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      updateField("image", null);
      updateField("imagePreview", null);
      return;
    }

    updateField("image", file);

    const reader = new FileReader();
    reader.onloadend = () => {
      updateField("imagePreview", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    if (
      !currentAuction.title ||
      !currentAuction.description ||
      !currentAuction.startingBid
    ) {
      throw new Error("Please fill in all required fields");
    }
    if (!currentAuction.startDate || !currentAuction.endDate) {
      throw new Error("Please set auction dates");
    }
    if (
      new Date(currentAuction.endDate) <= new Date(currentAuction.startDate)
    ) {
      throw new Error("End date must be after start date");
    }
    if (!currentAuction.image) {
      throw new Error("Please upload an image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    clearError();

    try {
      validateForm();

      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert(`Auction "${currentAuction.title}" created successfully!`);
      resetForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    resetForm();
  };

  return (
    <div className="create-auction-container">
      <div className="create-auction-card">
        <h1 className="page-title">Create New Auction</h1>

        {/* Error Display */}
        {error && (
          <div className="error-banner">
            <p>{error}</p>
            <button onClick={clearError} className="error-close">
              ×
            </button>
          </div>
        )}

        <form className="auction-form" onSubmit={handleSubmit}>
          {/* Title Field */}
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Auction Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-input"
              value={currentAuction.title}
              onChange={handleInputChange}
              placeholder="Enter auction title"
              disabled={loading}
              required
            />
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label htmlFor="image" className="form-label">
              Upload Image *
            </label>
            <div className="image-upload-container">
              <input
                type="file"
                id="image"
                name="image"
                className="file-input"
                accept="image/*"
                onChange={handleImageChange}
                disabled={loading}
                required
              />
              <label htmlFor="image" className="file-input-label">
                <div className="upload-area">
                  {currentAuction.imagePreview ? (
                    <div className="image-preview">
                      <img
                        src={currentAuction.imagePreview}
                        alt="Preview"
                        className="preview-image"
                      />
                      <p className="change-image-text">Click to change image</p>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <div className="upload-icon">📁</div>
                      <p>Click to upload image</p>
                      <p className="upload-hint">JPG, PNG, GIF up to 10MB</p>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Description Field */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              className="form-textarea"
              value={currentAuction.description}
              onChange={handleInputChange}
              placeholder="Describe your item in detail..."
              rows="5"
              disabled={loading}
              required
            ></textarea>
          </div>

          {/* Starting Bid */}
          <div className="form-group">
            <label htmlFor="startingBid" className="form-label">
              Starting Bid ($) *
            </label>
            <input
              type="number"
              id="startingBid"
              name="startingBid"
              className="form-input"
              value={currentAuction.startingBid}
              onChange={handleInputChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              disabled={loading}
              required
            />
          </div>

          {/* Date Fields */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate" className="form-label">
                Auction Start Date *
              </label>
              <input
                type="datetime-local"
                id="startDate"
                name="startDate"
                className="form-input"
                value={currentAuction.startDate}
                onChange={handleInputChange}
                disabled={loading}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate" className="form-label">
                Auction End Date *
              </label>
              <input
                type="datetime-local"
                id="endDate"
                name="endDate"
                className="form-input"
                value={currentAuction.endDate}
                onChange={handleInputChange}
                disabled={loading}
                required
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
              disabled={loading}
            >
              Reset
            </button>
            <button
              type="submit"
              className={`btn btn-primary ${loading ? "btn-loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Auction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
