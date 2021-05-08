import { ProjectInfo } from "./components/ProjectInfo";
import { ProjectData } from "./components/ProjectData";
import { useState } from "react";
import { post } from "../../helpers/api";
import { ProjectTrain } from "./components/ProjectTrain";

export function NewProject({ history }) {
  // info
  const [name, setName] = useState("");
  const [project, setProject] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [loadingProjectInfo, setLoadingProjectInfo] = useState(false);

  // data
  const [selectedFile, setSelectedFile] = useState({});
  const [allColumns, setAllColumns] = useState([]);
  const [deletedColumns, setDeletedColumns] = useState([]);
  const [savedColumns, setSavedColumns] = useState([]);
  const [temporaryUuid, setTemporaryUuid] = useState(null);
  const [label, setLabel] = useState(null);
  const [projectConfig, setProjectConfig] = useState(null);

  // meta
  const [loadingCsv, toggleLoadingCsv] = useState(false);
  const [loadingProjectData, setLoadingProjectData] = useState(false);

  // form states
  const [projectDataCompleted, setProjectDataCompleted] = useState(false);
  const [projectInfoCompleted, setProjectInfoCompleted] = useState(false);
  const [loadingProjectTrain, setLoadingProjectTrain] = useState(false);

  async function handleProjectInfo(e) {
    e.preventDefault();
    setLoadingProjectInfo(true);
    const project = await (await post(`projects`, { project_name: name })).data;
    setProject(project);
    setLoadingProjectInfo(false);
    setProjectInfoCompleted(true);
  }

  async function handleProjectData(e) {
    e.preventDefault();
    setLoadingProjectData(true);
    const config = await (
      await post(`projects/${project.id}/config`, {
        project: project.id,
        project_type: selectedType,
      })
    ).data;
    setProjectConfig(config);
    setLoadingProjectData(false);
    setProjectDataCompleted(true);
  }

  async function handleFile(e) {
    e.preventDefault();
    toggleLoadingCsv(true);
    setSelectedFile(e.target.files[0]);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const data = await (
      await post(
        "project-file",
        formData,
        {},
        {
          "Content-Type": "multipart/form-data",
        }
      )
    ).data;

    toggleLoadingCsv(false);
    setAllColumns([...data.columns]);
    setSavedColumns([...data.columns]);
    setTemporaryUuid(data.temporary_uuid);
  }

  function deleteColumn(column) {
    setSavedColumns([...savedColumns.filter((c) => c !== column)]);
    setDeletedColumns([
      ...deletedColumns,
      ...savedColumns.filter((c) => c === column),
    ]);
  }

  function restoreColumn(column) {
    setDeletedColumns([...deletedColumns.filter((c) => c !== column)]);
    setSavedColumns([...savedColumns, column]);
  }

  async function train(e) {
    e.preventDefault();
    setLoadingProjectTrain(true);
    await post(
      `projects/${project.id}/config/${projectConfig.id}/config_file`,
      {
        project_configuration: projectConfig.id,
        all_columns: allColumns,
        saved_columns: savedColumns,
        deleted_columns: deletedColumns,
        label,
        temporary_uuid: temporaryUuid,
        project_id: project.id,
      }
    );
    setLoadingProjectTrain(false);
    history.push("/app/projects");
  }

  return (
    <>
      <ProjectInfo
        name={name}
        selectedType={selectedType}
        loadingProjectInfo={loadingProjectInfo}
        setName={setName}
        setSelectedType={setSelectedType}
        handleProjectInfo={handleProjectInfo}
      />
      <ProjectData
        project={project}
        selectedType={selectedType}
        deleteColumn={deleteColumn}
        restoreColumn={restoreColumn}
        handleProjectData={handleProjectData}
        handleFile={handleFile}
        allColumns={allColumns}
        deletedColumns={deletedColumns}
        savedColumns={savedColumns}
        selectedFile={selectedFile}
        label={label}
        setLabel={setLabel}
        loadingCsv={loadingCsv}
        loadingProjectData={loadingProjectData}
        projectInfoCompleted={projectInfoCompleted}
      />
      <ProjectTrain
        train={train}
        loadingProjectTrain={loadingProjectTrain}
        projectDataCompleted={projectDataCompleted}
        projectInfoCompleted={projectInfoCompleted}
      />
    </>
  );
}
