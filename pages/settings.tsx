import { NextPage } from "next";
import React from "react";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";

const Settings: NextPage = () => {
  const [user] = useAuthState(auth);
  const [value, loading, error] = useCollection(
    query(collection(db, "users"), where("email", "==", user?.email || "")),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  let settings = { email: "", name: "" };

  value?.forEach((item) => {
    settings = {
      ...settings,
      ...item?.data(),
    };
  });

  return (
    <div>
      <div className="pb-5 border-b border-gray-200 mt-12">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Account Settings
        </h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Workcation is a property rental website. Etiam ullamcorper massa
          viverra consequat, consectetur id nulla tempus. Fringilla egestas
          justo massa purus sagittis malesuada.
        </p>
      </div>
      <div className="w-full mt-12">
        <div className="mt-6">
          <ul role="list" className="">
            <li className="py-4 flex">
              <div className="flex flex-row items-center">
                <span className="text-sm font-medium text-gray-900 mr-12">
                  Name
                </span>
                <span className="text-lg text-gray-400">{settings.name}</span>
              </div>
            </li>
            <li className="py-4 flex">
              <div className="flex flex-row items-center">
                <span className="text-sm font-medium text-gray-900 mr-12">
                  Email
                </span>
                <span className="text-lg text-gray-400">{settings.email}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Settings;
