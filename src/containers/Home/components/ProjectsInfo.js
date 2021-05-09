import { ProjectCard } from "./ProjectCard";
import { types } from "../../../redux/types/ProjectTypes";

export function ProjectsInfo({
  regression_models_trained,
  classification_models_trained,
}) {
  return (
    <dl className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-1 lg:grid-cols-2">
      <ProjectCard
        label="Regression"
        number_models_trained={regression_models_trained}
        type={types.REGRESSION}
      />
      <ProjectCard
        label="Classification"
        number_models_trained={classification_models_trained}
        type={types.CLASSIFICATION}
      />
    </dl>
  );
}
