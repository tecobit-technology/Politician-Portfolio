"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

// =====================================================
// TYPES
// =====================================================

type Locale = "en" | "ne";

type WorkTranslation = {
  locale: Locale;

  title: string;
  description: string;

  category: string;
  location: string;
  eventTypes: string;
  eventCategory: string;

  problem: string;
  action: string;
  outcome: string;
};

export type Work = {
  _id: string;

  projectId: string;

  translations: WorkTranslation[];

  image: string;
  galleryImages: string[];

  ward: string;

  status: "Ongoing" | "Completed";

  completedDate?: string | null;

  createdAt?: string;
  updatedAt?: string;
};

type EditWorkEntryModalProps = {
  work: Work;

  onClose: () => void;

  onSave: (updatedWork: Work) => Promise<void> | void;
};

// =====================================================
// COMPONENT
// =====================================================

export default function EditWorkEntryModal({
  work,
  onClose,
  onSave,
}: EditWorkEntryModalProps) {
  // =====================================================
  // ENGLISH
  // =====================================================

  const [englishTitle, setEnglishTitle] = useState("");
  const [englishDescription, setEnglishDescription] =
    useState("");

  const [englishCategory, setEnglishCategory] =
    useState("");

  const [englishLocation, setEnglishLocation] =
    useState("");

  const [englishEventTypes, setEnglishEventTypes] =
    useState("");

  const [englishEventCategory, setEnglishEventCategory] =
    useState("");

  const [englishProblem, setEnglishProblem] =
    useState("");

  const [englishAction, setEnglishAction] =
    useState("");

  const [englishOutcome, setEnglishOutcome] =
    useState("");

  // =====================================================
  // NEPALI
  // =====================================================

  const [nepaliTitle, setNepaliTitle] = useState("");
  const [nepaliDescription, setNepaliDescription] =
    useState("");

  const [nepaliCategory, setNepaliCategory] =
    useState("");

  const [nepaliLocation, setNepaliLocation] =
    useState("");

  const [nepaliEventTypes, setNepaliEventTypes] =
    useState("");

  const [nepaliEventCategory, setNepaliEventCategory] =
    useState("");

  const [nepaliProblem, setNepaliProblem] =
    useState("");

  const [nepaliAction, setNepaliAction] =
    useState("");

  const [nepaliOutcome, setNepaliOutcome] =
    useState("");

  // =====================================================
  // COMMON
  // =====================================================

  const [projectId, setProjectId] = useState("");
  const [ward, setWard] = useState("");

  const [status, setStatus] =
    useState<"Ongoing" | "Completed">("Ongoing");

  const [completedDate, setCompletedDate] =
    useState("");

  // =====================================================
  // MAIN IMAGE
  // =====================================================

  const [image, setImage] = useState("");

  const [imagePreview, setImagePreview] =
    useState("");

  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);

  // =====================================================
  // GALLERY IMAGES
  // =====================================================

  const [galleryImages, setGalleryImages] =
    useState<string[]>([]);

  const [selectedGalleryImages, setSelectedGalleryImages] =
    useState<File[]>([]);

  const [galleryPreviews, setGalleryPreviews] =
    useState<string[]>([]);

  // =====================================================
  // STATE
  // =====================================================

  const [loading, setLoading] = useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] = useState("");

  // =====================================================
  // REFS
  // =====================================================

  const mainImageInputRef =
    useRef<HTMLInputElement>(null);

  const galleryImageInputRef =
    useRef<HTMLInputElement>(null);

  // =====================================================
  // LOAD WORK DATA
  // =====================================================

  useEffect(() => {
    if (!work) return;

    // ===================================================
    // FIND TRANSLATIONS
    // ===================================================

    const english =
      work.translations?.find(
        (translation) =>
          translation.locale === "en",
      );

    const nepali =
      work.translations?.find(
        (translation) =>
          translation.locale === "ne",
      );

    // ===================================================
    // ENGLISH
    // ===================================================

    setEnglishTitle(
      english?.title || "",
    );

    setEnglishDescription(
      english?.description || "",
    );

    setEnglishCategory(
      english?.category || "",
    );

    setEnglishLocation(
      english?.location || "",
    );

    setEnglishEventTypes(
      english?.eventTypes || "",
    );

    setEnglishEventCategory(
      english?.eventCategory || "",
    );

    setEnglishProblem(
      english?.problem || "",
    );

    setEnglishAction(
      english?.action || "",
    );

    setEnglishOutcome(
      english?.outcome || "",
    );

    // ===================================================
    // NEPALI
    // ===================================================

    setNepaliTitle(
      nepali?.title || "",
    );

    setNepaliDescription(
      nepali?.description || "",
    );

    setNepaliCategory(
      nepali?.category || "",
    );

    setNepaliLocation(
      nepali?.location || "",
    );

    setNepaliEventTypes(
      nepali?.eventTypes || "",
    );

    setNepaliEventCategory(
      nepali?.eventCategory || "",
    );

    setNepaliProblem(
      nepali?.problem || "",
    );

    setNepaliAction(
      nepali?.action || "",
    );

    setNepaliOutcome(
      nepali?.outcome || "",
    );

    // ===================================================
    // COMMON
    // ===================================================

    setProjectId(
      work.projectId || "",
    );

    setWard(
      work.ward || "",
    );

    setStatus(
      work.status || "Ongoing",
    );

    // ===================================================
    // DATE
    // ===================================================

    if (work.completedDate) {
      const parsedDate =
        new Date(work.completedDate);

      if (
        !Number.isNaN(
          parsedDate.getTime(),
        )
      ) {
        setCompletedDate(
          parsedDate
            .toISOString()
            .split("T")[0],
        );
      } else {
        setCompletedDate("");
      }
    } else {
      setCompletedDate("");
    }

    // ===================================================
    // MAIN IMAGE
    // ===================================================

    setImage(
      work.image || "",
    );

    setImagePreview(
      work.image || "",
    );

    setSelectedImage(null);

    // ===================================================
    // GALLERY
    // ===================================================

    setGalleryImages(
      Array.isArray(work.galleryImages)
        ? work.galleryImages
        : [],
    );

    setSelectedGalleryImages([]);

    setGalleryPreviews([]);

    // ===================================================
    // RESET
    // ===================================================

    setError("");
    setLoading(false);
    setUploading(false);
  }, [work]);

  // =====================================================
  // MAIN IMAGE CHANGE
  // =====================================================

  function handleImageChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    // ---------------------------------------------------
    // TYPE
    // ---------------------------------------------------

    if (!file.type.startsWith("image/")) {
      setError(
        "Only image files are allowed.",
      );
      return;
    }

    // ---------------------------------------------------
    // SIZE
    // ---------------------------------------------------

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      setError(
        "Main image must be smaller than 5MB.",
      );
      return;
    }

    setError("");

    setSelectedImage(file);

    const previewUrl =
      URL.createObjectURL(file);

    setImagePreview(previewUrl);
  }

  // =====================================================
  // GALLERY IMAGE CHANGE
  // =====================================================

  function handleGalleryImagesChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const files =
      Array.from(
        event.target.files || [],
      );

    if (files.length === 0) return;

    // ---------------------------------------------------
    // VALIDATE FILES
    // ---------------------------------------------------

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        setError(
          "Only image files are allowed.",
        );
        return;
      }

      if (
        file.size >
        5 * 1024 * 1024
      ) {
        setError(
          `${file.name} is larger than 5MB.`,
        );
        return;
      }
    }

    setError("");

    setSelectedGalleryImages(
      (previous) => [
        ...previous,
        ...files,
      ],
    );

    const newPreviews =
      files.map((file) =>
        URL.createObjectURL(file),
      );

    setGalleryPreviews(
      (previous) => [
        ...previous,
        ...newPreviews,
      ],
    );

    // Allow selecting same file again
    event.target.value = "";
  }

  // =====================================================
  // REMOVE EXISTING GALLERY IMAGE
  // =====================================================

  function removeGalleryImage(
    index: number,
  ) {
    setGalleryImages(
      (previous) =>
        previous.filter(
          (_, imageIndex) =>
            imageIndex !== index,
        ),
    );
  }

  // =====================================================
  // REMOVE NEW GALLERY IMAGE
  // =====================================================

  function removeNewGalleryImage(
    index: number,
  ) {
    setSelectedGalleryImages(
      (previous) =>
        previous.filter(
          (_, imageIndex) =>
            imageIndex !== index,
        ),
    );

    setGalleryPreviews(
      (previous) =>
        previous.filter(
          (_, imageIndex) =>
            imageIndex !== index,
        ),
    );
  }

  // =====================================================
  // UPLOAD IMAGE TO CLOUDINARY
  // =====================================================

  async function uploadImageToCloudinary(
    file: File,
    folder: string,
  ): Promise<string> {
    const formData = new FormData();

    formData.append(
      "image",
      file,
    );

    formData.append(
      "folder",
      folder,
    );

    const response =
      await fetch(
        "/api/cloudinary/upload",
        {
          method: "POST",
          body: formData,
        },
      );

    const data =
      await response.json();

    if (
      !response.ok ||
      !data.success
    ) {
      throw new Error(
        data?.error ||
          "Failed to upload image.",
      );
    }

    return data.url;
  }

  // =====================================================
  // SUBMIT
  // =====================================================

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    // ===================================================
    // VALIDATION
    // ===================================================

    if (!projectId.trim()) {
      setError(
        "Project ID is required.",
      );
      return;
    }

    if (!englishTitle.trim()) {
      setError(
        "English title is required.",
      );
      return;
    }

    if (!englishDescription.trim()) {
      setError(
        "English description is required.",
      );
      return;
    }

    if (!nepaliTitle.trim()) {
      setError(
        "Nepali title is required.",
      );
      return;
    }

    if (!nepaliDescription.trim()) {
      setError(
        "Nepali description is required.",
      );
      return;
    }

    if (!englishCategory.trim()) {
      setError(
        "English category is required.",
      );
      return;
    }

    if (!nepaliCategory.trim()) {
      setError(
        "Nepali category is required.",
      );
      return;
    }

    if (!englishLocation.trim()) {
      setError(
        "English location is required.",
      );
      return;
    }

    if (!nepaliLocation.trim()) {
      setError(
        "Nepali location is required.",
      );
      return;
    }

    try {
      setLoading(true);

      // =================================================
      // MAIN IMAGE
      // =================================================

      let imageUrl = image;

      if (selectedImage) {
        setUploading(true);

        imageUrl =
          await uploadImageToCloudinary(
            selectedImage,
            "works",
          );

        setUploading(false);
      }

      // =================================================
      // GALLERY IMAGES
      // =================================================

      let updatedGalleryImages =
        [...galleryImages];

      if (
        selectedGalleryImages.length >
        0
      ) {
        setUploading(true);

        const uploadedGalleryImages =
          await Promise.all(
            selectedGalleryImages.map(
              (file) =>
                uploadImageToCloudinary(
                  file,
                  "works/gallery",
                ),
            ),
          );

        updatedGalleryImages = [
          ...updatedGalleryImages,
          ...uploadedGalleryImages,
        ];

        setUploading(false);
      }

      // =================================================
      // UPDATED WORK
      // =================================================

      const updatedWork: Work = {
        ...work,

        projectId:
          projectId.trim(),

        translations: [
          // =============================================
          // ENGLISH
          // =============================================

          {
            locale: "en",

            title:
              englishTitle.trim(),

            description:
              englishDescription.trim(),

            category:
              englishCategory.trim(),

            location:
              englishLocation.trim(),

            eventTypes:
              englishEventTypes.trim(),

            eventCategory:
              englishEventCategory.trim(),

            problem:
              englishProblem.trim(),

            action:
              englishAction.trim(),

            outcome:
              englishOutcome.trim(),
          },

          // =============================================
          // NEPALI
          // =============================================

          {
            locale: "ne",

            title:
              nepaliTitle.trim(),

            description:
              nepaliDescription.trim(),

            category:
              nepaliCategory.trim(),

            location:
              nepaliLocation.trim(),

            eventTypes:
              nepaliEventTypes.trim(),

            eventCategory:
              nepaliEventCategory.trim(),

            problem:
              nepaliProblem.trim(),

            action:
              nepaliAction.trim(),

            outcome:
              nepaliOutcome.trim(),
          },
        ],

        image:
          imageUrl,

        galleryImages:
          updatedGalleryImages,

        ward:
          ward.trim(),

        status,

        completedDate:
          status === "Completed"
            ? completedDate || null
            : null,
      };

      // =================================================
      // DEBUG
      // =================================================

      console.log(
        "UPDATED WORK:",
        JSON.stringify(
          updatedWork,
          null,
          2,
        ),
      );

      // =================================================
      // SEND TO PARENT
      // =================================================

      await onSave(updatedWork);

      // =================================================
      // SUCCESS
      // =================================================

      alert(
        "Work updated successfully!",
      );

      onClose();
    } catch (error) {
      console.error(
        "Update work error:",
        error,
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update work.",
      );
    } finally {
      setLoading(false);
      setUploading(false);
    }
  }

  // =====================================================
  // INPUT CLASS
  // =====================================================

  const inputClass = `
    w-full
    rounded-lg
    border
    border-gray-300
    bg-white
    px-4
    py-3
    text-sm
    text-[#221f1a]
    outline-none
    transition
    focus:border-[#8A1538]
    focus:ring-1
    focus:ring-[#8A1538]
    disabled:opacity-50
  `;

  // =====================================================
  // TEXTAREA CLASS
  // =====================================================

  const textareaClass = `
    w-full
    rounded-lg
    border
    border-gray-300
    bg-white
    px-4
    py-3
    text-sm
    text-[#221f1a]
    outline-none
    transition
    focus:border-[#8A1538]
    focus:ring-1
    focus:ring-[#8A1538]
    disabled:opacity-50
    resize-y
  `;

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        px-4
        py-6
      "
    >
      <div
        className="
          flex
          max-h-[92vh]
          w-full
          max-w-[900px]
          flex-col
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-[#e1d0cf]
            px-6
            py-5
          "
        >
          <div>
            <h2
              className="
                font-['Libre_Baskerville']
                text-xl
                font-semibold
                text-[#221f1a]
              "
            >
              Edit Work
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-[#4a483f]
              "
            >
              Update development project
              information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              text-2xl
              text-[#4a483f]
              transition
              hover:bg-gray-100
              hover:text-[#221f1a]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div
            className="
              min-h-0
              flex-1
              space-y-6
              overflow-y-auto
              px-6
              py-6
            "
          >
            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
              <div
                className="
                  rounded-lg
                  border
                  border-red-200
                  bg-red-50
                  px-4
                  py-3
                  text-sm
                  text-red-600
                "
              >
                {error}
              </div>
            )}

            {/* =================================================
                COMMON INFORMATION
            ================================================= */}

            <div
              className="
                rounded-xl
                border
                border-[#e1d0cf]
                bg-[#faf9f7]
                p-5
              "
            >
              <h3
                className="
                  mb-4
                  text-sm
                  font-semibold
                  text-[#8A1538]
                "
              >
                Project Information
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                {/* PROJECT ID */}

                <div>
                  <label
                    htmlFor="edit-work-project-id"
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-[#221f1a]
                    "
                  >
                    Project ID
                  </label>

                  <input
                    id="edit-work-project-id"
                    type="text"
                    value={projectId}
                    onChange={(e) =>
                      setProjectId(
                        e.target.value,
                      )
                    }
                    disabled={loading}
                    className={inputClass}
                  />
                </div>

                {/* WARD */}

                <div>
                  <label
                    htmlFor="edit-work-ward"
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-[#221f1a]
                    "
                  >
                    Ward
                  </label>

                  <input
                    id="edit-work-ward"
                    type="text"
                    value={ward}
                    onChange={(e) =>
                      setWard(
                        e.target.value,
                      )
                    }
                    disabled={loading}
                    placeholder="e.g. Ward 5"
                    className={inputClass}
                  />
                </div>

                {/* STATUS */}

                <div>
                  <label
                    htmlFor="edit-work-status"
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-[#221f1a]
                    "
                  >
                    Status
                  </label>

                  <select
                    id="edit-work-status"
                    value={status}
                    onChange={(e) =>
                      setStatus(
                        e.target.value as
                          | "Ongoing"
                          | "Completed",
                      )
                    }
                    disabled={loading}
                    className={inputClass}
                  >
                    <option value="Ongoing">
                      Ongoing
                    </option>

                    <option value="Completed">
                      Completed
                    </option>
                  </select>
                </div>

                {/* COMPLETED DATE */}

                <div>
                  <label
                    htmlFor="edit-work-completed-date"
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-[#221f1a]
                    "
                  >
                    Completed Date
                  </label>

                  <input
                    id="edit-work-completed-date"
                    type="date"
                    value={completedDate}
                    onChange={(e) =>
                      setCompletedDate(
                        e.target.value,
                      )
                    }
                    disabled={
                      loading ||
                      status !==
                        "Completed"
                    }
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* =================================================
                ENGLISH
            ================================================= */}

            <div
              className="
                rounded-xl
                border
                border-[#e1d0cf]
                bg-[#faf9f7]
                p-5
              "
            >
              <h3
                className="
                  mb-5
                  text-sm
                  font-semibold
                  text-[#8A1538]
                "
              >
                English
              </h3>

              <div className="space-y-5">
                {/* TITLE */}

                <div>
                  <label
                    htmlFor="edit-work-english-title"
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-[#221f1a]
                    "
                  >
                    Title
                  </label>

                  <input
                    id="edit-work-english-title"
                    type="text"
                    value={englishTitle}
                    onChange={(e) =>
                      setEnglishTitle(
                        e.target.value,
                      )
                    }
                    disabled={loading}
                    className={inputClass}
                  />
                </div>

                {/* DESCRIPTION */}

                <div>
                  <label
                    htmlFor="edit-work-english-description"
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-[#221f1a]
                    "
                  >
                    Description
                  </label>

                  <textarea
                    id="edit-work-english-description"
                    value={
                      englishDescription
                    }
                    onChange={(e) =>
                      setEnglishDescription(
                        e.target.value,
                      )
                    }
                    disabled={loading}
                    rows={4}
                    className={textareaClass}
                  />
                </div>

                {/* CATEGORY + LOCATION */}

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="edit-work-english-category"
                      className="
                        mb-2
                        block
                        text-sm
                        font-medium
                        text-[#221f1a]
                      "
                    >
                      Category
                    </label>

                    <input
                      id="edit-work-english-category"
                      type="text"
                      value={
                        englishCategory
                      }
                      onChange={(e) =>
                        setEnglishCategory(
                          e.target.value,
                        )
                      }
                      disabled={loading}
                      className={
                        inputClass
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="edit-work-english-location"
                      className="
                        mb-2
                        block
                        text-sm
                        font-medium
                        text-[#221f1a]
                      "
                    >
                      Location
                    </label>

                    <input
                      id="edit-work-english-location"
                      type="text"
                      value={
                        englishLocation
                      }
                      onChange={(e) =>
                        setEnglishLocation(
                          e.target.value,
                        )
                      }
                      disabled={loading}
                      className={
                        inputClass
                      }
                    />
                  </div>
                </div>

                {/* EVENT TYPES + EVENT CATEGORY */}

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="edit-work-english-event-types"
                      className="
                        mb-2
                        block
                        text-sm
                        font-medium
                        text-[#221f1a]
                      "
                    >
                      Event Types
                    </label>

                    <input
                      id="edit-work-english-event-types"
                      type="text"
                      value={
                        englishEventTypes
                      }
                      onChange={(e) =>
                        setEnglishEventTypes(
                          e.target.value,
                        )
                      }
                      disabled={loading}
                      className={
                        inputClass
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="edit-work-english-event-category"
                      className="
                        mb-2
                        block
                        text-sm
                        font-medium
                        text-[#221f1a]
                      "
                    >
                      Event Category
                    </label>

                    <input
                      id="edit-work-english-event-category"
                      type="text"
                      value={
                        englishEventCategory
                      }
                      onChange={(e) =>
                        setEnglishEventCategory(
                          e.target.value,
                        )
                      }
                      disabled={loading}
                      className={
                        inputClass
                      }
                    />
                  </div>
                </div>

                {/* PROBLEM */}

                <div>
                  <label
                    htmlFor="edit-work-english-problem"
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-[#221f1a]
                    "
                  >
                    Problem
                  </label>

                  <textarea
                    id="edit-work-english-problem"
                    value={englishProblem}
                    onChange={(e) =>
                      setEnglishProblem(
                        e.target.value,
                      )
                    }
                    disabled={loading}
                    rows={3}
                    className={textareaClass}
                  />
                </div>

                {/* ACTION */}

                <div>
                  <label
                    htmlFor="edit-work-english-action"
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-[#221f1a]
                    "
                  >
                    Action
                  </label>

                  <textarea
                    id="edit-work-english-action"
                    value={englishAction}
                    onChange={(e) =>
                      setEnglishAction(
                        e.target.value,
                      )
                    }
                    disabled={loading}
                    rows={3}
                    className={textareaClass}
                  />
                </div>

                {/* OUTCOME */}

                <div>
                  <label
                    htmlFor="edit-work-english-outcome"
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-[#221f1a]
                    "
                  >
                    Outcome
                  </label>

                  <textarea
                    id="edit-work-english-outcome"
                    value={englishOutcome}
                    onChange={(e) =>
                      setEnglishOutcome(
                        e.target.value,
                      )
                    }
                    disabled={loading}
                    rows={3}
                    className={textareaClass}
                  />
                </div>
              </div>
            </div>

            {/* =================================================
                NEPALI
            ================================================= */}

            <div
              className="
                rounded-xl
                border
                border-[#e1d0cf]
                bg-[#faf9f7]
                p-5
              "
            >
              <h3
                className="
                  mb-5
                  text-sm
                  font-semibold
                  text-[#8A1538]
                "
              >
                नेपाली
              </h3>

              <div className="space-y-5">
                {/* TITLE */}

                <div>
                  <label
                    htmlFor="edit-work-nepali-title"
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-[#221f1a]
                    "
                  >
                    शीर्षक
                  </label>

                  <input
                    id="edit-work-nepali-title"
                    type="text"
                    value={nepaliTitle}
                    onChange={(e) =>
                      setNepaliTitle(
                        e.target.value,
                      )
                    }
                    disabled={loading}
                    className={inputClass}
                  />
                </div>

                {/* DESCRIPTION */}

                <div>
                  <label
                    htmlFor="edit-work-nepali-description"
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-[#221f1a]
                    "
                  >
                    विवरण
                  </label>

                  <textarea
                    id="edit-work-nepali-description"
                    value={
                      nepaliDescription
                    }
                    onChange={(e) =>
                      setNepaliDescription(
                        e.target.value,
                      )
                    }
                    disabled={loading}
                    rows={4}
                    className={textareaClass}
                  />
                </div>

                {/* CATEGORY + LOCATION */}

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="edit-work-nepali-category"
                      className="
                        mb-2
                        block
                        text-sm
                        font-medium
                        text-[#221f1a]
                      "
                    >
                      वर्ग
                    </label>

                    <input
                      id="edit-work-nepali-category"
                      type="text"
                      value={
                        nepaliCategory
                      }
                      onChange={(e) =>
                        setNepaliCategory(
                          e.target.value,
                        )
                      }
                      disabled={loading}
                      className={
                        inputClass
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="edit-work-nepali-location"
                      className="
                        mb-2
                        block
                        text-sm
                        font-medium
                        text-[#221f1a]
                      "
                    >
                      स्थान
                    </label>

                    <input
                      id="edit-work-nepali-location"
                      type="text"
                      value={
                        nepaliLocation
                      }
                      onChange={(e) =>
                        setNepaliLocation(
                          e.target.value,
                        )
                      }
                      disabled={loading}
                      className={
                        inputClass
                      }
                    />
                  </div>
                </div>

                {/* EVENT TYPES + EVENT CATEGORY */}

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="edit-work-nepali-event-types"
                      className="
                        mb-2
                        block
                        text-sm
                        font-medium
                        text-[#221f1a]
                      "
                    >
                      कार्यक्रम प्रकार
                    </label>

                    <input
                      id="edit-work-nepali-event-types"
                      type="text"
                      value={
                        nepaliEventTypes
                      }
                      onChange={(e) =>
                        setNepaliEventTypes(
                          e.target.value,
                        )
                      }
                      disabled={loading}
                      className={
                        inputClass
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="edit-work-nepali-event-category"
                      className="
                        mb-2
                        block
                        text-sm
                        font-medium
                        text-[#221f1a]
                      "
                    >
                      कार्यक्रम वर्ग
                    </label>

                    <input
                      id="edit-work-nepali-event-category"
                      type="text"
                      value={
                        nepaliEventCategory
                      }
                      onChange={(e) =>
                        setNepaliEventCategory(
                          e.target.value,
                        )
                      }
                      disabled={loading}
                      className={
                        inputClass
                      }
                    />
                  </div>
                </div>

                {/* PROBLEM */}

                <div>
                  <label
                    htmlFor="edit-work-nepali-problem"
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-[#221f1a]
                    "
                  >
                    समस्या
                  </label>

                  <textarea
                    id="edit-work-nepali-problem"
                    value={nepaliProblem}
                    onChange={(e) =>
                      setNepaliProblem(
                        e.target.value,
                      )
                    }
                    disabled={loading}
                    rows={3}
                    className={textareaClass}
                  />
                </div>

                {/* ACTION */}

                <div>
                  <label
                    htmlFor="edit-work-nepali-action"
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-[#221f1a]
                    "
                  >
                    कार्य
                  </label>

                  <textarea
                    id="edit-work-nepali-action"
                    value={nepaliAction}
                    onChange={(e) =>
                      setNepaliAction(
                        e.target.value,
                      )
                    }
                    disabled={loading}
                    rows={3}
                    className={textareaClass}
                  />
                </div>

                {/* OUTCOME */}

                <div>
                  <label
                    htmlFor="edit-work-nepali-outcome"
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-[#221f1a]
                    "
                  >
                    परिणाम
                  </label>

                  <textarea
                    id="edit-work-nepali-outcome"
                    value={nepaliOutcome}
                    onChange={(e) =>
                      setNepaliOutcome(
                        e.target.value,
                      )
                    }
                    disabled={loading}
                    rows={3}
                    className={textareaClass}
                  />
                </div>
              </div>
            </div>

            {/* =================================================
                MAIN IMAGE
            ================================================= */}

            <div
              className="
                rounded-xl
                border
                border-[#e1d0cf]
                bg-[#faf9f7]
                p-5
              "
            >
              <h3
                className="
                  mb-4
                  text-sm
                  font-semibold
                  text-[#8A1538]
                "
              >
                Main Image
              </h3>

              <input
                ref={mainImageInputRef}
                type="file"
                accept="image/*"
                onChange={
                  handleImageChange
                }
                disabled={loading}
                className="hidden"
              />

              <button
                type="button"
                onClick={() =>
                  mainImageInputRef.current?.click()
                }
                disabled={loading}
                className="
                  flex
                  h-64
                  w-full
                  cursor-pointer
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-xl
                  border
                  border-dashed
                  border-gray-300
                  bg-gray-50
                  transition
                  hover:bg-gray-100
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt={
                      englishTitle ||
                      "Work preview"
                    }
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-2xl">
                      ⬆
                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                      Click to replace
                      main image
                    </p>
                  </div>
                )}
              </button>

              <p className="mt-2 text-xs text-gray-500">
                Select a new image only if
                you want to replace the
                current image. Maximum 5MB.
              </p>
            </div>

            {/* =================================================
                GALLERY IMAGES
            ================================================= */}

            <div
              className="
                rounded-xl
                border
                border-[#e1d0cf]
                bg-[#faf9f7]
                p-5
              "
            >
              <div className="flex items-center justify-between">
                <h3
                  className="
                    text-sm
                    font-semibold
                    text-[#8A1538]
                  "
                >
                  Gallery Images
                </h3>

                <span className="text-xs text-gray-500">
                  {galleryImages.length +
                    selectedGalleryImages.length}{" "}
                  images
                </span>
              </div>

              {/* EXISTING IMAGES */}

              {galleryImages.length >
                0 && (
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {galleryImages.map(
                    (
                      galleryImage,
                      index,
                    ) => (
                      <div
                        key={`${galleryImage}-${index}`}
                        className="group relative overflow-hidden rounded-lg border"
                      >
                        <img
                          src={galleryImage}
                          alt={`Gallery ${
                            index + 1
                          }`}
                          className="
                            h-28
                            w-full
                            object-cover
                          "
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeGalleryImage(
                              index,
                            )
                          }
                          disabled={
                            loading
                          }
                          className="
                            absolute
                            right-1
                            top-1
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-full
                            bg-black/70
                            text-sm
                            text-white
                            transition
                            hover:bg-red-600
                            disabled:opacity-50
                          "
                          aria-label="Remove gallery image"
                        >
                          ×
                        </button>
                      </div>
                    ),
                  )}
                </div>
              )}

              {/* NEW IMAGE PREVIEWS */}

              {galleryPreviews.length >
                0 && (
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {galleryPreviews.map(
                    (
                      preview,
                      index,
                    ) => (
                      <div
                        key={`${preview}-${index}`}
                        className="relative overflow-hidden rounded-lg border"
                      >
                        <img
                          src={preview}
                          alt={`New gallery ${
                            index + 1
                          }`}
                          className="
                            h-28
                            w-full
                            object-cover
                          "
                        />

                        <span className="absolute bottom-1 left-1 rounded bg-[#8A1538] px-2 py-1 text-[10px] text-white">
                          New
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            removeNewGalleryImage(
                              index,
                            )
                          }
                          disabled={
                            loading
                          }
                          className="
                            absolute
                            right-1
                            top-1
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-full
                            bg-black/70
                            text-sm
                            text-white
                            transition
                            hover:bg-red-600
                            disabled:opacity-50
                          "
                          aria-label="Remove new gallery image"
                        >
                          ×
                        </button>
                      </div>
                    ),
                  )}
                </div>
              )}

              {/* UPLOAD */}

              <input
                ref={
                  galleryImageInputRef
                }
                type="file"
                accept="image/*"
                multiple
                onChange={
                  handleGalleryImagesChange
                }
                disabled={loading}
                className="hidden"
              />

              <button
                type="button"
                onClick={() =>
                  galleryImageInputRef.current?.click()
                }
                disabled={loading}
                className="
                  mt-4
                  flex
                  w-full
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-dashed
                  border-gray-300
                  bg-white
                  px-4
                  py-4
                  text-sm
                  font-medium
                  text-[#4a483f]
                  transition
                  hover:bg-gray-50
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                + Add Gallery Images
              </button>

              <p className="mt-2 text-xs text-gray-500">
                You can select multiple
                images. Maximum 5MB per
                image.
              </p>
            </div>
          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <div
            className="
              flex
              shrink-0
              items-center
              justify-end
              gap-3
              border-t
              border-[#e1d0cf]
              bg-white
              px-6
              py-4
            "
          >
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                rounded-lg
                border
                border-[#0b1f3a]
                bg-white
                px-5
                py-2.5
                text-sm
                font-medium
                text-[#0b1f3a]
                transition
                hover:bg-[#0b1f3a]
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                rounded-lg
                bg-[#8A1538]
                px-5
                py-2.5
                text-sm
                font-medium
                text-white
                transition
                hover:bg-[#74122f]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {uploading
                ? "Uploading..."
                : loading
                  ? "Saving..."
                  : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}