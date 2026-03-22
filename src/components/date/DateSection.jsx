import './DateSection.css';
import Calendar from './components/Calendar';
import DDayCounter from './components/DDayCounter';
import SectionTitle from '../common/SectionTitle';
import * as WEDDING from '../../constants/wedding';

const DateSection = () => {
  return (
    <section id="date" className="date-section">
      <div className="container">
        <SectionTitle en="WEDDING DATE" kr="결혼식 일정" />
        
        <div className="date-calendar fade-in">
          <Calendar />
        </div>
        <div className="date-dday fade-in">
          <DDayCounter />
        </div>
      </div>
    </section>
  );
};

export default DateSection;

