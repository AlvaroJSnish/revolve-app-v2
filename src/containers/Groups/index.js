import { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { get } from "../../helpers/api";
import { showMoreGroupsModal } from "../../redux/actions/AuthActions";
import { fetchGroupsRequest } from "../../redux/actions/GroupsActions";

export function Groups({ history }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { groups } = useSelector((state) => state.groups, shallowEqual);

  useEffect(() => {
    (async function () {
      const { available, slots, account_type } = await (
        await get("users/available-groups")
      ).data;

      if (!available) {
        dispatch(showMoreGroupsModal({ account_type, available, slots }));
      }
    })();
  }, []);

  useEffect(() => {
    dispatch(fetchGroupsRequest());
  }, []);

  return (
    <div className="flex flex-col mt-4">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 min-w-full sm:px-6 lg:px-8 grid grid-cols-3 gap-10">
          <GroupsCards groups={groups.results} history={history} />
        </div>
      </div>
    </div>
  );
}

function GroupsCards({ groups = [], history }) {
  const { path } = useRouteMatch();

  function onClickGroup(id) {
    history.push(`${path}/${id}`);
  }

  return groups.map((group) => (
    <div
      key={group.id}
      className="shadow w-full h-full p-4 cursor-pointer border-indigo-300 border-r-4"
      onClick={() => onClickGroup(group.id)}
    >
      <h3 className="text-xl mb-3">{group.group_name}</h3>
      <h4 className="text-gray-500">{group.owner.email}</h4>
    </div>
  ));
}
