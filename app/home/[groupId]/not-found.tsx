import React from "react";

export default function NotFound() {
  return (
    <div className="fixed left-6/12 top-6/12 -translate-x-6/12 -translate-y-6/12">
      <div className="max-w-2xl text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            No task groups found.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-lg mx-auto">
            Start by creating a new task group to stay organized.
          </p>
        </div>
      </div>
    </div>
  );
}
