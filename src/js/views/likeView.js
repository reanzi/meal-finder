import { elements } from "./base";
import { limitRecipeTitle } from "./searchView";

export const toggleLikeBtn = isLiked => {
  // icons.svg#icon-heart-outlined
  const iconString = isLiked ? "icon-heart" : "icon-heart-outlined";
  // select the element/icon
  let heart = document.querySelector(".recipe__love use");
  //set attribute
  heart.setAttribute("href", `img/icons.svg#${iconString}`);
};

export const toggleLikeMenu = numlikes => {
  elements.likesMenu.style.visibility = numlikes > 0 ? "visible" : "hidden";
};

export const renderLikes = like => {
  const markup = `
        <li>
            <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                    <img src="img/${like.img}" alt="${like.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitRecipeTitle(
                      like.title
                    )} ...</h4>
                    <p class="likes__author">${like.author}</p>
                </div>
            </a> 
        </li>
    `;

  elements.likesList.insertAdjacentHTML("beforeend", markup);
};

export const deleteLike = id => {
  const el = document.querySelector(`.likes__link[href*="${id}"]`)
    .parentElement;

  if (el) el.parentElement.removeChild(el);
};
