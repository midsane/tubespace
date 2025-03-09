import toast from "react-hot-toast";
import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { fetchDraftVideos, fetchRelevantWorkspaces } from "../fetch/fetchForYoutuber";

export const createRouteLoader = async ({ params }: LoaderFunctionArgs) => {
    const { draftName } = params;
    if (draftName) {
        return null
    }
    else {
        const youtuberDraftArr = await fetchDraftVideos();

        if (!youtuberDraftArr.success) {
            toast.error(youtuberDraftArr.message);
            return redirect(`../home`);
        }

        if (!youtuberDraftArr.data || youtuberDraftArr.data.length === 0) {
            toast.error("No drafts available");
            return redirect(`../home`);
        }

        toast.success("Showing latest draft");
        const latestDraftName = youtuberDraftArr.data[0].DraftTitle;

        return redirect(`${latestDraftName}`);
    }
}

export const workspaceRouteLoader = async ({ params }: LoaderFunctionArgs) => {
    const { workspaceName } = params;
    if (workspaceName) {
        return null
    }
    else {
        const youtuberWorkSpacesArr = await fetchRelevantWorkspaces();

        if (!youtuberWorkSpacesArr.success) {
            toast.error(youtuberWorkSpacesArr.message);
            return redirect(`../home`);
        }

        if (!youtuberWorkSpacesArr.data || youtuberWorkSpacesArr.data.length === 0) {
            toast.error("No workspace available");
            return redirect(`../home`);
        }

        toast.success("Showing latest Workspace");
        const latestWorkspaceName = youtuberWorkSpacesArr.data[0].name;

        return redirect(`${latestWorkspaceName}`);
    }
}