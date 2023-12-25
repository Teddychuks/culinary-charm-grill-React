import CreateNewReviewsDoc from "../features/ApiDocumentations/CreateNewReviewsDoc";
import CreateOrdersDoc from "../features/ApiDocumentations/CreateOrdersDoc";
import ForgotPasswordDoc from "../features/ApiDocumentations/ForgotPasswordDoc";
import GetAllMenu from "../features/ApiDocumentations/GetAllMenu";
import GetAllReviewsById from "../features/ApiDocumentations/GetAllReviewsById";
import GetMenu from "../features/ApiDocumentations/GetMenu";
import GetMenuStatDoc from "../features/ApiDocumentations/GetMenuStatDoc";
import GetOrderStatDoc from "../features/ApiDocumentations/GetOrderStatDoc";
import GetUserOrderStatDoc from "../features/ApiDocumentations/GetUserOrderDoc";
import LoginUserDoc from "../features/ApiDocumentations/LoginUserDoc";
import ResetPasswordDoc from "../features/ApiDocumentations/ResetPasswordDoc";
import SignUpDoc from "../features/ApiDocumentations/SignUpDoc";
import UpdatePasswordDoc from "../features/ApiDocumentations/UpdatePasswordDoc";
import { serverUrl } from "../services/server";

function DocumentationList() {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-md px-4 md:px-8">
        <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl md:mb-6">
          Culinary Charm Grill API Documentation
        </h1>
        <div className="border-t border-gray-200 pt-6 space-y-12">
          <GetAllMenu serverUrl={serverUrl} />
          <GetMenu serverUrl={serverUrl} />
          <GetMenuStatDoc serverUrl={serverUrl} />
          <SignUpDoc serverUrl={serverUrl} />
          <LoginUserDoc serverUrl={serverUrl} />
          <UpdatePasswordDoc serverUrl={serverUrl} />
          <ResetPasswordDoc serverUrl={serverUrl} />
          <ForgotPasswordDoc serverUrl={serverUrl} />
          <CreateOrdersDoc serverUrl={serverUrl} />
          <GetOrderStatDoc serverUrl={serverUrl} />
          <GetUserOrderStatDoc serverUrl={serverUrl} />
          <CreateNewReviewsDoc serverUrl={serverUrl} />
          <GetAllReviewsById serverUrl={serverUrl} />
        </div>
      </div>
    </div>
  );
}

export default DocumentationList;
