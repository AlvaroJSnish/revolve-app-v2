import { useTranslation } from "react-i18next";

import { ProjectCard } from "./ProjectCard";
import { types } from "../../../redux/types/ProjectTypes";

export function ProjectsInfo({
  regression_models_trained,
  classification_models_trained,
}) {
  const { t } = useTranslation();
  return (
    <dl className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-1 lg:grid-cols-2">
      <ProjectCard
        label={t("projects.Regression")}
        labelLowerCase={t("projects.regression")}
        number_models_trained={regression_models_trained}
        type={types.REGRESSION}
      />
      <ProjectCard
        label={t("projects.Classification")}
        labelLowerCase={t("projects.classification")}
        number_models_trained={classification_models_trained}
        type={types.CLASSIFICATION}
      />
    </dl>
  );
}
