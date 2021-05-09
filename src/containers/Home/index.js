import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserStatsRequest } from "../../redux/actions/UserStatsActions";
import { AccuracyChart, ErrorChart } from "./components";
import { ProjectsInfo } from "./components/ProjectsInfo";
import { useTranslation } from "react-i18next";

export function Home() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const { userStats } = useSelector((state) => state.userStats, shallowEqual);

  useEffect(() => {
    dispatch(getUserStatsRequest(user.id));
  }, []);

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <h3 className="text-2xl leading-6 font-medium text-gray-900">
            <span className="text-gray-500">{t("home.welcome")}</span>{" "}
            {user.username || user.email.split("@")[0]}
          </h3>
          <h4 className="pt-4 pb-10 text-gray-600">{t("home.quickLook")}</h4>
          <div className="mb-10">
            <ProjectsInfo
              regression_models_trained={userStats.regression_models_trained}
              classification_models_trained={
                userStats.classification_models_trained
              }
            />
          </div>
          <AccuracyChart
            average_accuracy={userStats.average_accuracy}
            last_week_average_accuracy={userStats.last_week_average_accuracy}
          />
          <ErrorChart
            average_error={userStats.average_error}
            last_week_average_error={userStats.last_week_average_error}
          />
        </div>
      </div>
    </div>
  );
}
