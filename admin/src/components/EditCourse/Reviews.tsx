import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { IBReview } from "types";
import { useRecoilValue } from "recoil";
import Store from "store";
import Axios, { AxiosResponse } from "axios";
import urlBackend from "config/api";
import ReactMarkdown from "react-markdown";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "33.33%",
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  })
);

export default function Reviews(props: { cid: string }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const token = useRecoilValue(Store.User).token;
  const [reviews, setReviews] = useState<Array<IBReview>>([]);
  useEffect(() => {
    Axios.get(urlBackend(`secure/getReviews/${props.cid}`), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp: AxiosResponse<IBReview[]>) => {
      setReviews(resp.data);
    });
  }, []);

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      {reviews.map((review, index) => {
        return (
          <Accordion
            expanded={expanded === "panel" + index}
            onChange={handleChange("panel" + index)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}bh-content`}
              id={`panel${index}bh-header`}
            >
              <Typography className={classes.heading}>
                {review.semester}
              </Typography>
              <Typography className={classes.secondaryHeading}>
                {review.semester}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ReactMarkdown children={review.grading} />
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
