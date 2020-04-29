import AbstractComponent from "./abstract-component.js";

export const createBigUserRankTemplate = () => {
  return (
    `<p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">Sci-Fighter</span>
    </p>`
  );
};

export default class BigUserRank extends AbstractComponent {

  getTemplate() {
    return createBigUserRankTemplate();
  }
}
