import React from "react";

import { ColumnTypes, RowTypes } from "../enums";
import { GridCollection } from "../types";

import { GeoCategoryEditor } from "./GeoCategoryEditor/GeoCategoryEditor";

export const TABLE_DATA: GridCollection = {
  columns: [
    {
      key: "id",
      name: "",
      type: ColumnTypes.Id,
      visible: {
        table: true,
      },
    },
    {
      key: "4b4b4bf6-0437-43ab-8854-d3c10510151e",
      name: "Лиц. участок",
      type: ColumnTypes.RemovableWithEditor,
      width: 120,
      visible: {
        table: true,
      },
    },
    {
      key: "d3e58c1c-c582-4cc9-89fc-f67193dd9e85",
      name: "Поднятие/купол",
      type: ColumnTypes.RemovableWithEditor,
      visible: {
        table: true,
      },
    },
    {
      key: "2544f6ae-5950-45f5-b81e-197ae6f1765d",
      name: "Скважина",
      type: ColumnTypes.None,
      visible: {
        table: true,
      },
    },
    {
      key: "99fd19b1-da64-41cb-9fd1-9d8c8311ca22",
      name: "Пласт",
      type: ColumnTypes.None,
      visible: {
        table: true,
      },
    },
    {
      key: "MINE",
      name: "Залежь",
      type: ColumnTypes.None,
      visible: {
        table: true,
      },
    },
    {
      key: "geo_object_category",
      name: "Категория",
      type: ColumnTypes.WithClickEditor,
      columnEditor: (props) =>
        React.createElement(GeoCategoryEditor, {
          ...props,
        }),
      visible: {
        table: true,
      },
    },
    {
      key: "geo_object_fluid_category",
      name: "Флюид",
      type: ColumnTypes.WithClickEditor,
      columnEditor: (props) =>
        React.createElement(GeoCategoryEditor, {
          ...props,
        }),
      visible: {
        table: true,
      },
    },
    {
      key: "splitter",
      name: "",
      type: ColumnTypes.Splitter,
      visible: {
        table: true,
      },
    },
    {
      key: "MIXTURE_AREA",
      name: "F, тыс. м²",
      type: ColumnTypes.Number,
      visible: {
        table: true,
      },
    },
    {
      key: "OIL_POOL_NET_THICKNESS",
      name: "H эфф.нн, м",
      type: ColumnTypes.Number,
      visible: {
        table: true,
      },
    },
    {
      key: "splitter_oil",
      name: "Нефть",
      type: ColumnTypes.Splitter,
      isRenaming: true,
      visible: {
        table: true,
      },
    },
    {
      key: "OIL_FORMATION_POROSITY_RATIO",
      name: "Кᴴп, д. ед.",
      type: ColumnTypes.Number,
      visible: {
        table: true,
      },
    },
    {
      key: "FORMATION_OIL_SATURATION_FACTOR",
      name: "Кн, д. ед.",
      type: ColumnTypes.Number,
      visible: {
        table: true,
      },
    },
    {
      key: "DENSITY",
      name: "Плотность, г/см³",
      type: ColumnTypes.Number,
      visible: {
        table: true,
      },
    },
  ],
  rows: [
    {
      'id': 1,
      "4b4b4bf6-0437-43ab-8854-d3c10510151e": "Архангеловский",
      "d3e58c1c-c582-4cc9-89fc-f67193dd9e85": "Архангеловское",
      "2544f6ae-5950-45f5-b81e-197ae6f1765d": "1",
      "99fd19b1-da64-41cb-9fd1-9d8c8311ca22": "Дфр",
      "MINE": "залежь 1",
      "geo_object_category": "Ресурсы",
      "geo_object_fluid_category": "Нефть",
      "splitter": "",
      "MIXTURE_AREA": 0.95,
      "OIL_POOL_NET_THICKNESS": 0.64,
      "OIL_FORMATION_POROSITY_RATIO": 123,
      "FORMATION_OIL_SATURATION_FACTOR": 4444,
      "DENSITY": 9000,
      "style": 'Odd',
      "type": RowTypes.Default,
    },
    {
      "4b4b4bf6-0437-43ab-8854-d3c10510151e": "Концепция 1",
      "type": RowTypes.Delimeter,
    },
    {
      'id': 2,
      "4b4b4bf6-0437-43ab-8854-d3c10510151e": "Архангеловский",
      "d3e58c1c-c582-4cc9-89fc-f67193dd9e85": "Архангеловское",
      "2544f6ae-5950-45f5-b81e-197ae6f1765d": "1",
      "99fd19b1-da64-41cb-9fd1-9d8c8311ca22": "Дфр",
      "MINE": "залежь 2",
      "geo_object_category": "Запасы",
      "geo_object_fluid_category": "Газ",
      "splitter": "",
      "MIXTURE_AREA": 0.959990,
      "OIL_POOL_NET_THICKNESS": 0.643424,
      "OIL_FORMATION_POROSITY_RATIO": 6123,
      "FORMATION_OIL_SATURATION_FACTOR": 8888,
      "DENSITY": 23,
      "style": 'Even',
      "type": RowTypes.Default,
    },
    {
      'id': 3,
      "4b4b4bf6-0437-43ab-8854-d3c10510151e": "Архангеловский",
      "d3e58c1c-c582-4cc9-89fc-f67193dd9e85": "Архангеловское",
      "2544f6ae-5950-45f5-b81e-197ae6f1765d": "1",
      "99fd19b1-da64-41cb-9fd1-9d8c8311ca22": "Дфр",
      "MINE": "залежь 3",
      "geo_object_category": "Запасы",
      "geo_object_fluid_category": "Газ",
      "splitter": "",
      "MIXTURE_AREA": 0.959990,
      "OIL_POOL_NET_THICKNESS": 0.643424,
      "OIL_FORMATION_POROSITY_RATIO": 6123,
      "FORMATION_OIL_SATURATION_FACTOR": 8888,
      "DENSITY": 23,
      "style": 'Even',
      "type": RowTypes.Default,
    },
    {
      'id': 4,
      "4b4b4bf6-0437-43ab-8854-d3c10510151e": "Архангеловский",
      "d3e58c1c-c582-4cc9-89fc-f67193dd9e85": "Архангеловское",
      "2544f6ae-5950-45f5-b81e-197ae6f1765d": "1",
      "99fd19b1-da64-41cb-9fd1-9d8c8311ca22": "Дфр",
      "MINE": "залежь 4",
      "geo_object_category": "Реурсы",
      "geo_object_fluid_category": "Газ",
      "splitter": "",
      "MIXTURE_AREA": 0.959990,
      "OIL_POOL_NET_THICKNESS": 0.643424,
      "OIL_FORMATION_POROSITY_RATIO": 6123,
      "FORMATION_OIL_SATURATION_FACTOR": 8888,
      "DENSITY": 23,
      "style": 'Odd',
      "type": RowTypes.Default,
    },
  ],
  filteredDataKeys: {
    columnsKeys: [
      "id",
      "4b4b4bf6-0437-43ab-8854-d3c10510151e",
      "d3e58c1c-c582-4cc9-89fc-f67193dd9e85",
      "2544f6ae-5950-45f5-b81e-197ae6f1765d",
      "99fd19b1-da64-41cb-9fd1-9d8c8311ca22",
      "MINE",
      "geo_object_category",
      "geo_object_fluid_category",
      "splitter",
      "MIXTURE_AREA",
      "OIL_POOL_NET_THICKNESS",
      "OIL_FORMATION_POROSITY_RATIO",
      "splitter_oil",
      "FORMATION_OIL_SATURATION_FACTOR",
      "DENSITY",
    ],
    rowsKeys: ["1", "2", "3", "4"],
  },
  isLoading: true,
};
