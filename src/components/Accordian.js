import TitleHeading from './TitleHeading';
import { IoIosArrowUp } from 'react-icons/io';


function Accordian({ title, children }) {
  return (
    <div className="accordian">
      <div className="accordian-header">
        <TitleHeading> {title} </TitleHeading>

        <IoIosArrowUp fontSize={'2rem'} />
      </div>

      <div className="accordian-content">{children}</div>
    </div>
  );
}

export default Accordian;
