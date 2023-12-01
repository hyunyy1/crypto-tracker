import styled from "styled-components";
import { PriceData } from "../interface";
import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

const PriceOverview = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 15px;
`;

const PriceOverviewItem = styled.span`
  text-align: center;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 400;
  background-color: ${(props) => props.theme.boxColor};
  padding: 7px 0px;
  border-radius: 10px;
  width: 210px;
  height: 120px;
  span:first-child {
    display: block;
    font-size: 15px;
    padding: 10px;
  }
  span:last-child {
    display: block;
    font-size: 23px;
    padding-top: 10px;
    padding-right: 100px;
  }
`;

const Incre = styled.div`
  font-size: 25px;
  padding-top: 10px;
  padding-right: 10px;
  color:#e74c3c;
`;

const Decre = styled.div`
  font-size: 25px;
  padding-top: 10px;
  padding-right: 10px;
  color:#27ae60;  
`;

const UpIcon = styled(FiTrendingUp)`
  font-size: 35px;
  margin-left: 12px;
`;

const DownIcon = styled(FiTrendingDown)`
  font-size: 35px;
  margin-left: 12px;
`;

interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<PriceData>(["price", coinId], () =>
    fetchCoinTickers(coinId)
  );
  const pc1h = data?.quotes.USD.percent_change_1h;
  const pc6h = data?.quotes.USD.percent_change_6h;
  const pc7d = data?.quotes.USD.percent_change_7d;
  const pc12h = data?.quotes.USD.percent_change_12h;
  const pc24h = data?.quotes.USD.percent_change_24h;
  const pc30d = data?.quotes.USD.percent_change_30d;
  return (
    <div>
      {isLoading ? (
        "Loading Price..."
      ) : (
        <>
          <PriceOverview>
            <PriceOverviewItem>
              <span>1시간 전보다</span>
            {pc1h! > 0 ? (<Incre>{pc1h}% <UpIcon /></Incre>) : (<Decre>{pc1h}% <DownIcon /></Decre>)}
            </PriceOverviewItem>
            <PriceOverviewItem>
              <span>6시간 전보다</span>
              {pc6h! > 0 ? (<Incre>{pc6h}% <UpIcon /></Incre>) : (<Decre>{pc6h}% <DownIcon /></Decre>)}
            </PriceOverviewItem>
            <PriceOverviewItem>
              <span>12시간 전보다</span>
              {pc12h! > 0 ? (<Incre>{pc12h}% <UpIcon /></Incre>) : (<Decre>{pc12h}% <DownIcon /></Decre>)}
            </PriceOverviewItem>
            <PriceOverviewItem>
              <span>24시간 전보다</span>
              {pc24h! > 0 ? (<Incre>{pc24h}% <UpIcon /></Incre>) : (<Decre>{pc24h}% <DownIcon /></Decre>)}
            </PriceOverviewItem>
            <PriceOverviewItem>
              <span>7일 전보다</span>
              {pc7d! > 0 ? (<Incre>{pc7d}% <UpIcon /></Incre>) : (<Decre>{pc7d}% <DownIcon /></Decre>)}
            </PriceOverviewItem>
            <PriceOverviewItem>
              <span>30일 전보다</span>
              {pc30d! > 0 ? (<Incre>{pc30d}% <UpIcon /></Incre>) : (<Decre>{pc30d}% <DownIcon /></Decre>)}
            </PriceOverviewItem>
          </PriceOverview>
        </>
      )}
    </div>
  );
}

export default Price;
