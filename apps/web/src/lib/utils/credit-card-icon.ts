// Get credit card icon based on card type
import { CardIcon } from '../../components/icons/outline';
import {
  AmericanExpressColorIcon,
  DiscoverColorIcon,
  MastercardColorIcon,
  VisaColorIcon
} from '../../components/icons/payment';

export const getCreditCardIcon = (cardType: string) => {
  switch (cardType) {
    case 'visa':
      return VisaColorIcon;
    case 'mastercard':
      return MastercardColorIcon;
    case 'american-express':
      return AmericanExpressColorIcon;
    case 'discover':
      return DiscoverColorIcon;
    default:
      return CardIcon;
  }
};
