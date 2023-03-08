import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, createSelector, on } from "@ngrx/store";
import { CourseActions } from "../action-types";
import { selectCoursesState } from "../courses.selectors";
import { compareCourses, Course } from "../model/course";

export interface CourseState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
});

export const initialCoursesState = adapter.getInitialState({
  allCoursesLoaded: false,
});

export const coursesReducer = createReducer(
  initialCoursesState,

  on(CourseActions.allCoursesLoaded, (state, action) =>
    adapter.setAll(action.courses, { ...state, allCoursesLoaded: true })
  )
);

export const { selectAll } = adapter.getSelectors();

export const areCoursesLoaded = createSelector(
  selectCoursesState,
  (state) => state.allCoursesLoaded
);
