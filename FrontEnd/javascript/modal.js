// gestion de la boite de dialogue modal 1 (ouvrir et fermer)

function modal() {
  const openModal = document.querySelector(".open-modal");
  openModal.addEventListener("click", () => {
    const modal = document.querySelector(".modal");
    modal.style.display = "block";

    const modalClose = document.querySelector(".modalClose");
    modalClose.addEventListener("click", (event) => {
      const modal = document.querySelector(".modal");
      modal.style.display = "none";
      event.preventDefault();
    });
  });

  const modal = document.querySelector(".modal");
  modal.addEventListener("click", () => {
    modal.style.display = "none";
    modalContent.stopPropagation();
  });

  const modalContent = document.querySelector(".modal-content");
  modalContent.addEventListener("click", function (e) {
    e.stopPropagation();
  });
}

//   la modale doit se fermer au click sur l'exterieur de la modal

modal();

// closeModal()

// fonction pour insérer les photos dans la gallery-modal
// fontion generer les photos présente dans l'API

function createModalGallery() {
  fetch("http://localhost:5678/api/works")
    .then((response) => {
      return response.json();
    })
    .then((mesprojets) => {
      const galleryModal = document.querySelector(".contenairGallery");
      galleryModal.classList.add = "contenairGallery";

      for (const projets of mesprojets) {
        const projet = document.createElement("figure");

        const imageElement = document.createElement("img");
        imageElement.src = projets.imageUrl;
        imageElement.className = "photoModal";

        projet.setAttribute("name", projets.title);
        projet.setAttribute("data-id", projets.id);
        projet.setAttribute("category-id", projets.categoryId);

        galleryModal.appendChild(projet);
        projet.appendChild(imageElement);

        const deleteIcon = document.createElement("i");
        deleteIcon.className = "fa-solid fa-trash-can icon-delete";
        projet.appendChild(deleteIcon);

        deleteIcon.addEventListener("click", (event) => {
          event.preventDefault();
          deleteWork(projets.id);
        });
      }
    });

    
}

createModalGallery();

// création d'une fonction pour supprimer des projets de la galerie

function deleteWork(workId) {
  const token = localStorage.getItem("token");

  fetch(`http://localhost:5678/api/works/${workId}`, {
    method: "DELETE",
    headers: {
      accept: "*/*",
      authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.status === 200) {
      const projetReset = document.querySelector(
        `figure[data-id = "${workId}"]`
      );
      projetReset.style.display = "none";
    } else if (response.status === 401) {
      throw new Error("Unauthorized");
    } else if (response.status === 500) {
      throw new Error("Unexpected Behaviour");
    }
    return false;
  });
}

// Gestion de la modale 2 "Ajout de Travaux"

// navigation entre les modales

function navigationModales() {
  const btnAddPhoto = document.querySelector(".btnAddModal");

  btnAddPhoto.addEventListener("click", (event) => {
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
    event.preventDefault();

    const openmodal2 = document.querySelector(".openmodal2");
    openmodal2.style.display = "block";
  });

  const btnReturnGallery = document.querySelector(".returnGallery");
  btnReturnGallery.addEventListener("click", () => {
    const openmodal2 = document.querySelector(".openmodal2");
    openmodal2.style.display = "none";

    const modal = document.querySelector(".modal");
    modal.style.display = "block";
  });

  const modal2 = document.querySelector(".openmodal2");
  modal2.addEventListener("click", () => {
    modal2.style.display = "none";
  });

  const modal2Containt = document.querySelector(".modal2_Containt");
  modal2Containt.addEventListener("click", function (e) {
    e.stopPropagation();
  });
}

navigationModales();

// envois de nouveau travaux
// fonction envoyer "Send a new work"

async function sendWork() {
  const form = document.querySelector("#image-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const image = document.getElementById("input_photo").files[0];
    const title = document.getElementById("title-input").value;
    const selectElmt = document.getElementById("category-input");
    const category = selectElmt.options[selectElmt.selectedIndex].value;
    console.log(image);
   
    const btnPicture = document.querySelector(".button_add_picture")
    btnPicture.addEventListener("click", ()=> {
    btnPicture.style.width = " 7.8125rem";

     })       
    

    if (image !==  "" && title !== "" && selectElmt.value !== 0 ) {
        const btnValider = document.querySelector(".button_send_new_work")
        btnValider.style.background = "#1D6154"  

    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", category);


    const token = localStorage.getItem("token");

    const headers = new Headers();
    // headers.append("Accept", "application/json");
    // headers.append("Content-type", "multipart/form-data")
    headers.append("Authorization", `Bearer ${token}`);

    await fetch("http://localhost:5678/api/works/", {
      method: "POST",
      headers: headers,
      body: formData,
    })
    .then((response) => console.log(response))
    .catch((error) => console.error(error)) 
    // .then((response2) => {
    //     const  works = responses2.json();
        
    //     //ajout du nouveau projet dans gallery
    //     const projet = genererGallery(works);
    //     const gallery = document.querySelector(".gallery");
    //     const title = works.title;
    //     const image = works.image;
    //     projet.setAttribute("data-id") = works.category
    //     gallery.appendChild(projet);
    //     projet.appendChild(image);
    //     projet.appendChild(title);
        
    //     //ajout du nouveau projet dans modal
    //     const projetModal = createModalGallery(works);
    //     const galleryModal = document.querySelector(".contenairGallery");
    //     const imageElement = works.image
    //     projetModal.setAttribute("data-id") = works.category
    //     galleryModal.appendChild(projetModal);
    //     projetModal.appendChild(imageElement);
    //     const deleteIcon = document.createElement("i");
    //     deleteIcon.className = "fa-solid fa-trash-can icon-delete";
    //     projetModal.appendChild(deleteIcon);
    // });
})

}
sendWork();


