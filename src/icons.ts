import { 
  HouseDoor as BsHouseDoor,
  People as BsPeople,
  Gear as BsGear,
  Truck as BsTruck,
  PersonBadge as BsPersonBadge,
  BoxArrowRight as BsBoxArrowRight,
  JournalCheck as BsJournalCheck,
  ClipboardCheck as BsClipboardCheck,
  GeoAlt as BsGeoAlt,
  GraphUp as BsGraphUp,
  ShieldLock as BsShieldLock
} from 'react-bootstrap-icons';
import { 
  FaUserShield,
  FaUserEdit,
  FaUserPlus,
  FaUserCircle
} from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';

export const IconMap: Record<string, React.ComponentType> = {
  // Bootstrap icons
  'BsHouseDoor': BsHouseDoor,
  'BsPeople': BsPeople,
  'BsGear': BsGear,
  'BsTruck': BsTruck,
  'BsPersonBadge': BsPersonBadge,
  'BsBoxArrowRight': BsBoxArrowRight,
  'BsJournalCheck': BsJournalCheck,
  'BsClipboardCheck': BsClipboardCheck,
  'BsGeoAlt': BsGeoAlt,
  'BsGraphUp': BsGraphUp,
  'BsShieldLock': BsShieldLock,
  
  // Font Awesome icons
  'FaUserShield': FaUserShield,
  'FaUserEdit': FaUserEdit,
  'FaUserPlus': FaUserPlus,
  'FaUserCircle': FaUserCircle,
  
  // React Icons
  ...BiIcons,
  ...AiIcons,
  ...MdIcons
};

export const getIconComponent = (iconName: string): React.ComponentType | null => {
  return IconMap[iconName] || null;
};