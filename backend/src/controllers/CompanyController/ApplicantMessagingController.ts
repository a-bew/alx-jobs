import { Request, Response } from 'express';
import { asyncWrapper } from '../../controllers/utils/asyncWrapper';
import { sendError, sendResponse } from '../../helpers';
import { applicantMessagingService } from '../../services/CompanyService/ApplicantMessagingService';


// Send message to the applicant
export const sendMessageToApplicant = asyncWrapper(async (req: Request, res: Response) => {
  try {
    const { applicantId } = req.params;
    const { message } = req.body;  // Assuming message body contains the message to be sent

    const notification = await applicantMessagingService.sendMessageToApplicant(applicantId, message);

    return sendResponse(res, { message: 'Message sent successfully', data: notification });
  } catch (error:any) {
    return sendError(res, error);
  }
});
