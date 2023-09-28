import {Oval} from "react-loader-spinner";

/*
 * TODO: LoadingOval isn't currently used
 *  but it should be used again once the issue with iPhone safari is solved.
 *
 * TODO: iPhone safari shows LoadingOval for every video transition.
 * TODO: the issue should be solved by checking how browser caching works by iphone safari etc..
 */
export default function LoadingOval() {

    return (
        <div className="absolute h-full w-full flex justify-center items-center">
            <Oval
                height = "80"
                width = "80"
                radius = "9"
                visible={true}
                color = '#4169e1'
                secondaryColor="#778899"
                ariaLabel = 'three-dots-loading'
            />
        </div>

    )
}