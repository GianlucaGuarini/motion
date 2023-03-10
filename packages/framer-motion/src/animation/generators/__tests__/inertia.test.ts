import { inertia } from "../inertia"
import { pregenerateKeyframes } from "./utils"

describe("inertia", () => {
    test("Runs animations with default values ", () => {
        const generator = inertia({
            keyframes: [0],
        })

        expect(pregenerateKeyframes(generator).keyframes).toEqual([0, 0])
    })

    test("Runs animation", () => {
        const generator = inertia({
            keyframes: [100],
            velocity: 200,
            power: 1,
            timeConstant: 500,
            restDelta: 0.5,
        })
        const { keyframes, duration } = pregenerateKeyframes(generator)
        expect(duration).toEqual(3)
        expect(keyframes).toEqual(expectedAnimationKeyframes)
    })

    test("modifyTarget changes calculated target", () => {
        const generator = inertia({
            keyframes: [100],
            velocity: 200,
            power: 1,
            timeConstant: 500,
            restDelta: 0.5,
            modifyTarget: (target) => target / 2,
        })
        const { keyframes, duration } = pregenerateKeyframes(generator)
        expect(duration).toEqual(2.31)
        expect(keyframes).toEqual(expectedAnimationModifyTargetKeyframes)
    })

    test("Negative velocity produces negative keyframes", () => {
        const positiveGenerator = inertia({ keyframes: [0], velocity: 100 })
        const negativeGenerator = inertia({ keyframes: [0], velocity: 100 })
        expect(pregenerateKeyframes(positiveGenerator).keyframes).toEqual(
            pregenerateKeyframes(negativeGenerator).keyframes.map((value) =>
                typeof value === "string" ? value : Math.abs(value)
            )
        )
    })

    test("Runs animation with min (not encountered)", () => {
        const generator = inertia({
            keyframes: [100],
            velocity: 200,
            power: 1,
            timeConstant: 500,
            restDelta: 0.5,
            min: 0,
        })
        const { keyframes, duration } = pregenerateKeyframes(generator)
        expect(duration).toEqual(3)
        expect(keyframes).toEqual(expectedAnimationKeyframes)
    })

    test("Runs animation with min (spring encountered)", () => {
        const generator = inertia({
            keyframes: [100],
            velocity: -200,
            power: 1,
            timeConstant: 500,
            restDelta: 0.5,
            min: 0,
        })
        const { keyframes, duration } = pregenerateKeyframes(generator)
        expect(duration).toEqual(1.42)
        expect(keyframes).toEqual(expectedAnimationKeyframesWithMin)
    })

    test("Runs animation with max (not encountered)", () => {
        const generator = inertia({
            keyframes: [100],
            velocity: -200,
            power: 1,
            timeConstant: 500,
            restDelta: 0.5,
            max: 200,
        })
        const { keyframes, duration } = pregenerateKeyframes(generator)
        expect(duration).toEqual(3)
        expect(keyframes).toEqual(expectedAnimationKeyframesNegative)
    })

    test("Runs animation with max (spring encountered)", () => {
        const generator = inertia({
            keyframes: [100],
            velocity: 200,
            power: 1,
            timeConstant: 500,
            restDelta: 0.5,
            max: 200,
        })
        const { keyframes, duration } = pregenerateKeyframes(generator)
        expect(duration).toEqual(1.42)
        expect(keyframes).toEqual(expectedAnimationKeyframesWithMax)
    })

    test("Higher lift = longer animation", () => {
        const long = inertia({
            keyframes: [100],
            velocity: 200,
            power: 1,
            timeConstant: 500,
            restDelta: 0.5,
        })
        const short = inertia({
            keyframes: [100],
            velocity: 200,
            power: 1,
            timeConstant: 0.1,
            restDelta: 0.5,
        })
        expect(pregenerateKeyframes(long).duration).toBeGreaterThan(
            pregenerateKeyframes(short).duration
        )
    })

    test("Higher power = further distance", () => {
        let longTarget = 0
        let shortTarget = 0
        const long = inertia({
            keyframes: [100],
            velocity: 200,
            power: 10,
            timeConstant: 500,
            restDelta: 0.5,
            modifyTarget: (v) => {
                longTarget = v
                return v
            },
        })
        const short = inertia({
            keyframes: [100],
            velocity: 200,
            power: 1,
            timeConstant: 500,
            restDelta: 0.5,
            modifyTarget: (v) => {
                shortTarget = v
                return v
            },
        })
        pregenerateKeyframes(long)
        pregenerateKeyframes(short)
        expect(longTarget).toBeGreaterThan(shortTarget)
    })
})

const expectedAnimationKeyframes = [
    100, 103.96026533864895, 107.84211216953537, 111.64709328315027,
    115.37673072267285, 119.0325163928081, 122.6159126565685,
    126.12835292023883, 129.57124220675774, 132.9459577177456,
    136.25384938440362, 139.4962404075043, 142.67442778668934,
    145.78968283928674, 148.8432517088549, 151.83635586365642,
    154.7701925852618, 157.64593544747805, 160.46473478579378,
    163.22771815752884, 165.93599079287213, 168.59063603698866,
    171.19271578337174, 173.7432708986148, 176.24332163877182,
    178.6938680574733, 181.09589040596114, 183.45034952520206, 185.758187230237,
    188.0203266869196, 190.2376727811947, 192.41111248106512, 194.5415151913903,
    196.62973310166018, 198.6766015268821, 200.6829392417181,
    202.64954880800565, 204.57721689579313, 206.46671459801814,
    208.3187977389553, 210.1342071765557, 211.91366909880014,
    213.65789531418406, 215.36758353645024, 217.04341766368373,
    218.68606805188017, 220.29619178309716, 221.8744329282958,
    223.42142280497757, 224.9377802297201, 226.42411176571153,
    227.88101196538435, 229.30906360824397, 230.7088379339885,
    232.08089487101216, 233.4257832603841, 234.7440410753921, 236.0361956367392,
    237.30276382347893, 238.54425227977376, 239.76115761755958,
    240.95396661519715, 242.12315641218987, 243.26919470004592,
    244.39253990936118, 245.4936413931975, 246.57293960682995,
    247.6308662839348, 248.6678446092888, 249.68428938804868, 250.6806072116787,
    251.6571966205927, 252.61444826357564, 253.55274505404822,
    254.47246232323744, 255.37396797031403, 256.2576226095571,
    257.12377971460444, 257.97278575984706, 258.8049803590233,
    259.6206964010689, 260.4202601832771, 261.2039915418216, 261.9722039796959,
    262.725204792118, 263.46329518945305, 264.1867704177014, 264.8959198766006,
    265.5910272353899, 266.2723705462809, 266.9402223556827, 267.59484981322385,
    268.23651477861586, 268.86547392640057, 269.4819788486232, 270.086276155473,
    270.67860757393, 271.2592100444594, 271.82831581579103, 272.38615253782143,
    272.93294335267746, 273.46890698397567, 273.99425782431484,
    274.5092060210359, 275.01395756028353, 275.5087143494036,
    275.99367429770865, 276.46903139564415, 276.9349757923875,
    277.39169387191004, 277.83936832753324, 278.2781782350084,
    278.70829912414945, 279.129903049047, 279.5431586568925, 279.9482312554392,
    280.3452828791277, 280.73447235390137, 281.1159553607395,
    281.48988449793137, 281.8564093421175, 282.2156765081227, 282.5678297076037,
    282.91300980653574, 283.2513548815608, 283.58300027522023,
    283.9080786500935, 284.226720041865, 284.53905191134004, 284.8451991954309,
    285.1452843571332, 285.4394274345129, 285.72774608872277,
    286.01035565106895, 286.2873691691444, 286.5588974520501,
    286.82504911471943, 287.0859306213663, 287.3416463280719,
    287.59229852452836, 287.8379874749564, 288.0788114582121,
    288.31486680709986, 288.54624794690653, 288.77304743317325,
    288.99535598871853, 289.2132625399288, 289.4268542523299,
    289.63621656545484, 289.8414332270203, 290.0425863264272,
    290.23975632759743, 290.4330221011603, 290.6224609560023,
    290.80814867019114, 290.99015952128843, 291.1685663160614,
    291.34344041960685, 291.5148517838977, 291.68286897576536,
    291.8475592043268, 292.0089883478692, 292.1672209802026, 292.3223203964896,
    292.4743486385648, 292.623366519752, 292.7694336491907, 292.9126084556803,
    293.0529482110523, 293.1905090530801, 293.3253460079348, 293.45751301219605,
    293.5870629344278, 293.71404759632645, 293.8385177934498, 293.9605233155363,
    294.0801129664216, 294.1973345835606, 294.3122350571631, 294.4248603489506,
    294.5352555105415, 294.64346470147234, 294.7495312068624,
    294.85349745472803, 294.95540503295456, 295.0552947059321,
    295.15320643086176, 295.249179373739, 295.3432519250206, 295.4354617149814,
    295.5258456287669, 295.6144398211477, 295.70127973098204,
    295.78640009539174, 295.86983496365747, 295.9516177108391,
    296.03178105112596, 296.1103570509229, 296.1873771416777, 296.2628721324534,
    296.3368722222532, 296.40940701209945, 296.4805055168753,
    296.55019617693074, 296.61850686945894, 296.68546491964776, 296.75109711161,
    296.81542969909765, 296.87848841600345, 296.9402984866549,
    297.00088463590447, 297.06027109901964, 297.1184816313775,
    297.1755395179672, 297.2314675827041, 297.2862881975598, 297.3400232915113,
    297.39269435931243, 297.44432247009286, 297.4949282757851,
    297.54453201938634, 297.5931535430552, 297.64081229604966,
    297.6875273425063, 297.7333173690665, 297.77820069235156, 297.8221952662891,
    297.8653186892954, 297.90758821131465, 297.9490207407192, 297.9896328510733,
    298.02944078776255, 298.06846047449244, 298.10670751965796,
    298.144197222587, 298.18094457966083, 298.2169642903121, 298.25227076290537,
    298.2868781205004, 298.3208002065017, 298.354050590196, 298.38664257218005,
    298.4185891896813, 298.4499032217727, 298.48059719448446, 298.5106833858151,
    298.5401738306423, 298.5690803255371, 298.5974144334829, 298.6251874885007,
    298.6524106001829, 298.67909465813705, 298.70525033634215,
    298.7308880974182, 298.7560181968115, 298.7806506868969, 298.8047954209988,
    298.8284620573329, 298.85166006286914, 298.87439871711916,
    298.89668711584784, 298.9185341747118, 298.9399486328259,
    298.96093905625895, 298.9815138414602, 299.00168121861793,
    299.02144925495213, 299.0408258579407, 299.05981877848336,
    299.0784356140015, 299.0966838114775, 299.1145706704337, 299.1321033458522,
    299.149288851037, 299.16613406041915, 299.1826457123072, 299.1988304115819,
    299.2146946323389, 299.2302447204779, 299.2454868962416, 299.2604272567034,
    299.27507177820684, 299.2894263187557, 299.3034966203577, 299.3172883113209,
    299.33080690850574, 299.34405781953126, 299.3570463449386,
    299.36977768031113, 299.38225691835265, 299.39448905092485,
    299.40647897104384, 299.41823147483746, 299.4297512634641,
    299.44104294499266, 299.4521110362463, 299.46295996460924,
    299.47359406979734, 299.48401760559454, 299.4942347415541, 300,
]

const expectedAnimationModifyTargetKeyframes = [
    100, 100.99006633466223, 101.96052804238384, 102.91177332078757,
    103.84418268066821, 104.75812909820203, 105.65397816414213,
    106.53208823005971, 107.39281055168944, 108.2364894294364,
    109.0634623461009, 109.87406010187607, 110.66860694667233,
    111.44742070982169, 112.21081292721372, 112.9590889659141,
    113.69254814631546, 114.41148386186951, 115.11618369644845,
    115.80692953938221, 116.48399769821803, 117.14765900924716,
    117.79817894584293, 118.4358177246537, 119.06083040969295,
    119.67346701436833, 120.27397260149029, 120.86258738130051,
    121.43954680755925, 122.0050816717299, 122.55941819529868,
    123.10277812026628, 123.63537879784758, 124.15743327541504,
    124.66915038172053, 125.17073481042952, 125.66238720200141,
    126.14430422394828, 126.61667864950454, 127.07969943473883,
    127.53355179413893, 127.97841727470004, 128.41447382854602,
    128.84189588411255, 129.26085441592093, 129.67151701297004,
    130.07404794577428, 130.46860823207393, 130.8553557012444,
    131.23444505743004, 131.6060279414279, 131.9702529913461, 132.327265902061,
    132.67720948349714, 133.02022371775305, 133.35644581509604,
    133.68601026884804, 134.0090489091848, 134.32569095586973,
    134.63606306994345, 134.9402894043899, 135.2384916537993,
    135.53078910304745, 135.81729867501147, 136.0981349773403,
    136.37341034829936, 136.64323490170747, 136.9077165709837,
    137.16696115232222, 137.42107234701217, 137.6701518029197,
    137.91429915514817, 138.15361206589392, 138.38818626351207,
    138.61811558080936, 138.84349199257852, 139.06440565238927,
    139.2809449286511, 139.49319643996176, 139.70124508975582,
    139.90517410026723, 140.10506504581926, 140.30099788545542,
    140.49305099492398, 140.6813011980295, 140.86582379736328,
    141.04669260442535, 141.22397996915015, 141.39775680884748,
    141.5680926365702, 141.73505558892066, 141.89871245330596,
    142.05912869465396, 142.21636848160014, 142.37049471215582,
    142.52156903886825, 142.6696518934825, 142.81480251111486,
    142.95707895394776, 143.09653813445536, 143.23323583816938,
    143.36722674599392, 143.4985644560787, 143.62730150525897,
    143.75348939007088, 143.8771785873509, 143.99841857442718,
    144.11725784891104, 144.23374394809687, 144.3479234679775,
    144.4598420818833, 144.5695445587521, 144.67707478103736,
    144.78247576226175, 144.88578966422313, 144.98705781385982,
    145.08632071978192, 145.18361808847536, 145.2789888401849,
    145.37247112448284, 145.46410233552936, 145.5539191270307,
    145.64195742690094, 145.72825245163395, 145.8128387203902,
    145.89575006880506, 145.9770196625234, 146.05668001046627, 146.134762977835,
    146.21129979885774, 146.28632108928332, 146.35985685862823,
    146.4319365221807, 146.50258891276724, 146.5718422922861, 146.6397243630125,
    146.70626227867984, 146.77148265534157, 146.83541158201797,
    146.8980746311321, 146.9594968687391, 147.01970286455304,
    147.07871670177497, 147.13656198672663, 147.1932618582933,
    147.24883899717963, 147.3033156349822, 147.35671356308248,
    147.4090541413637, 147.46035830675507, 147.5106465816068,
    147.55993908189936, 147.60825552529008, 147.65561523900058,
    147.7020371675478, 147.7475398803221, 147.79214157901535, 147.8358601049017,
    147.87871294597443, 147.92071724394134, 147.9618898010817,
    148.00224708696732, 148.04180524505065, 148.0805800991224,
    148.11858715964118, 148.155841629938, 148.19235841229766,
    148.22815211392006, 148.26323705276306, 148.29762726327004,
    148.33133650198369, 148.364378253049, 148.39676573360697,
    148.42851189908163, 148.45962944836245, 148.49013082888408,
    148.5200282416054, 148.54933364589016, 148.57805876429077,
    148.60621508723764, 148.63381387763536, 148.66086617536808,
    148.68738280171561, 148.713374363682, 148.73885125823864,
    148.76382367648304, 148.78830160771545, 148.81229484343476,
    148.83581298125515, 148.85886542874536, 148.88146140719172,
    148.90360995528692, 148.9253199327455, 148.94660002384794,
    148.96745874091437, 148.9879044277098, 149.00794526278148,
    149.02758926273074, 149.0468442854194, 149.06571803311337,
    149.0842180555633, 149.10235175302486, 149.12012637921882,
    149.13754904423268, 149.15462671736475, 149.17136622991194,
    149.18777427790252, 149.2038574247744, 149.21962210400085,
    149.23507462166373, 149.2502211589761, 149.2650677747549, 149.2796204078444,
    149.2938848794918, 149.30786689567603, 149.32157204938994,
    149.3350058228778, 149.34817358982812, 149.3610806175232,
    149.37373206894628, 149.38613300484658, 149.3982883857638,
    149.41020307401243, 149.42188183562658, 149.43332934226663,
    149.4445501730879, 149.45554881657227, 149.46632967232387,
    149.47689705282866, 149.4872551851798, 149.49740821276833, 150,
]

const expectedAnimationKeyframesWithMin = [
    100, 96.03973466135105, 92.15788783046463, 88.35290671684973,
    84.62326927732715, 80.9674836071919, 77.3840873434315, 73.87164707976117,
    70.42875779324226, 67.05404228225439, 63.74615061559638, 60.5037595924957,
    57.325572213310664, 54.21031716071326, 51.15674829114511, 48.16364413634358,
    45.22980741473819, 42.35406455252195, 39.53526521420622, 36.77228184247116,
    34.06400920712787, 31.409363963011344, 28.80728421662826, 26.25672910138519,
    23.75667836122817, 21.30613194252669, 18.904109594038857, 16.54965047479793,
    14.241812769762973, 11.979673313080411, 9.762327218805297,
    7.5888875189348965, 5.458484808609711, 3.3702668983398354,
    1.323398473117905, -0.6829392417180884, -2.5504366392219304,
    -4.119369806458783, -5.343809500682082, -6.198520496050522,
    -6.678188018315215, -6.795773895279445, -6.580163132703302,
    -6.073279953832154, -5.3268604416091545, -4.399067385327798,
    -3.3511227480280765, -2.2441156429408005, -1.136120366010626,
    -0.07973153617477233, 0.8799065562226499, 1.7065300468331976,
    2.37362871817985, 2.864773961641232, 3.1734378288347873, 3.302360175606138,
    3.2625368901677088, 3.0719132051868026, 2.753872074110266,
    2.335608739809387, 1.846479344239635, 1.3164042979261712,
    0.7743968519689656, 0.24727467923178975, -0.24140190124916064,
    -0.6721363140548124, -1.0300328250543445, -1.30506452397808,
    -1.4920851036546723, -1.5906082587432058, -1.6043872707269085,
    -1.5408337146515911, -1.4103181408493322, -1.2253970992892542,
    -1.0000101421945307, -0.7486877106164858, -0.48580640224657123,
    -0.22492239948750456, 0.021792795705084606, 0.2439973191859265,
    0.4334948642340047, 0.5844188736374692, 0.6932888121343098,
    0.7589480259929683, 0.7823974026306241, 0.7665426279792613,
    0.7158752396658898, 0.6361088889525295, 0.5337923090315198,
    0.4159195452371194, 0.2895561763537697, 0.16149771617176029,
    0.037973319030147924, -0.07559548245909954, -0.17477481268355835,
    -0.2562345571360686, -0.3178011178014577, -0.3584503485224228,
    -0.3782466977185835, -0.37823656113066495, -0.36030525539150166,
    -0.32700785143820765, -0.28138437101840846, -0.22676959095649116,
    -0.1666069804396438, -0.10427519429859669, -0.042934148760251846,
    0.014603890392405254, 0.06597447921726202, 0.10933041512042661,
    0.14338004157100342, 0.16739558397970875, 0.1811939736709082,
    0.1850936866775042, 0.17985192497466335, 0.16658698738329775,
    0.14669091786299812, 0.12173749544390697, 0.0933903688489364,
    0.06331567493104524, 0.03310285466958556, 0.004196638632041875,
    -0.02215763825401838, -0.04495406989839077, -0.06345105763119208,
    -0.07718129749175254, -0.0859478200857468, -0.08980759792920584,
    -0.08904468012921841, -0.08413512397713321, -0.07570616574155123,
    -0.06449211350032416, -0.05128936389831648, -0.03691275765931889,
    -0.0221552144769921, -0.007752247846719602, 0.005647423141537939,
    0.017504352738798582, 0.027403530576788012, 0.03506220467756449,
    0.040330693153308554, 0.04318681334953267, 0,
]

const expectedAnimationKeyframesNegative = [
    100, 96.03973466135105, 92.15788783046463, 88.35290671684973,
    84.62326927732715, 80.9674836071919, 77.3840873434315, 73.87164707976117,
    70.42875779324226, 67.05404228225439, 63.74615061559638, 60.5037595924957,
    57.325572213310664, 54.21031716071326, 51.15674829114511, 48.16364413634358,
    45.22980741473819, 42.35406455252195, 39.53526521420622, 36.77228184247116,
    34.06400920712787, 31.409363963011344, 28.80728421662826, 26.25672910138519,
    23.75667836122817, 21.30613194252669, 18.904109594038857, 16.54965047479793,
    14.241812769762973, 11.979673313080411, 9.762327218805297,
    7.5888875189348965, 5.458484808609711, 3.3702668983398354,
    1.323398473117905, -0.6829392417180884, -2.6495488080056617,
    -4.5772168957931285, -6.466714598018157, -8.318797738955297,
    -10.134207176555691, -11.913669098800142, -13.65789531418406,
    -15.36758353645024, -17.043417663683726, -18.686068051880184,
    -20.296191783097157, -21.874432928295775, -23.42142280497758,
    -24.93778022972009, -26.42411176571153, -27.881011965384346,
    -29.309063608243974, -30.708837933988505, -32.08089487101218,
    -33.425783260384094, -34.744041075392104, -36.03619563673921,
    -37.302763823478934, -38.54425227977375, -39.76115761755958,
    -40.95396661519716, -42.123156412189864, -43.26919470004592,
    -44.392539909361176, -45.49364139319748, -46.572939606829934,
    -47.6308662839348, -48.66784460928882, -49.6842893880487,
    -50.680607211678705, -51.65719662059271, -52.614448263575646,
    -53.55274505404823, -54.47246232323745, -55.373967970314034,
    -56.257622609557046, -57.12377971460441, -57.972785759847056,
    -58.804980359023304, -59.620696401068926, -60.42026018327707,
    -61.203991541821615, -61.97220397969589, -62.72520479211801,
    -63.46329518945307, -64.18677041770135, -64.89591987660063,
    -65.5910272353899, -66.27237054628091, -66.94022235568269,
    -67.59484981322385, -68.23651477861586, -68.86547392640054,
    -69.48197884862321, -70.08627615547299, -70.67860757392997,
    -71.25921004445942, -71.828315815791, -72.38615253782143,
    -72.93294335267746, -73.46890698397566, -73.99425782431481,
    -74.50920602103585, -75.01395756028352, -75.50871434940362,
    -75.99367429770865, -76.46903139564417, -76.93497579238749,
    -77.39169387191004, -77.83936832753322, -78.27817823500841,
    -78.70829912414943, -79.12990304904699, -79.5431586568925,
    -79.94823125543925, -80.3452828791277, -80.7344723539014,
    -81.11595536073952, -81.48988449793134, -81.8564093421175,
    -82.21567650812273, -82.56782970760374, -82.91300980653575,
    -83.25135488156081, -83.58300027522024, -83.90807865009351,
    -84.22672004186501, -84.53905191134005, -84.84519919543091,
    -85.14528435713322, -85.43942743451288, -85.7277460887228,
    -86.01035565106893, -86.28736916914441, -86.55889745205005,
    -86.8250491147194, -87.0859306213663, -87.34164632807185,
    -87.59229852452833, -87.8379874749564, -88.07881145821213,
    -88.31486680709983, -88.54624794690653, -88.77304743317326,
    -88.99535598871856, -89.21326253992879, -89.42685425232993,
    -89.63621656545483, -89.8414332270203, -90.04258632642721,
    -90.2397563275974, -90.43302210116033, -90.6224609560023,
    -90.80814867019116, -90.99015952128843, -91.16856631606143,
    -91.34344041960682, -91.51485178389773, -91.68286897576537,
    -91.84755920432676, -92.00898834786922, -92.16722098020259,
    -92.32232039648959, -92.47434863856475, -92.623366519752,
    -92.76943364919072, -92.91260845568027, -93.05294821105228,
    -93.19050905308013, -93.32534600793478, -93.45751301219603,
    -93.58706293442785, -93.71404759632645, -93.83851779344978,
    -93.9605233155363, -94.0801129664216, -94.19733458356059, -94.3122350571631,
    -94.4248603489506, -94.53525551054149, -94.64346470147237,
    -94.7495312068624, -94.85349745472801, -94.95540503295456,
    -95.05529470593213, -95.15320643086177, -95.249179373739, -95.3432519250206,
    -95.4354617149814, -95.52584562876687, -95.61443982114767,
    -95.70127973098201, -95.78640009539171, -95.86983496365748,
    -95.95161771083912, -96.03178105112595, -96.11035705092293,
    -96.18737714167767, -96.26287213245345, -96.33687222225316,
    -96.40940701209942, -96.48050551687533, -96.55019617693074,
    -96.61850686945894, -96.68546491964774, -96.75109711161002,
    -96.81542969909766, -96.87848841600344, -96.9402984866549,
    -97.00088463590446, -97.06027109901964, -97.11848163137753,
    -97.17553951796721, -97.2314675827041, -97.28628819755981,
    -97.34002329151124, -97.39269435931246, -97.44432247009284,
    -97.49492827578513, -97.54453201938631, -97.59315354305525,
    -97.64081229604969, -97.68752734250629, -97.73331736906653,
    -97.77820069235153, -97.82219526628911, -97.86531868929542,
    -97.90758821131465, -97.94902074071919, -97.98963285107328,
    -98.02944078776255, -98.06846047449244, -98.10670751965793,
    -98.14419722258705, -98.18094457966083, -98.21696429031209,
    -98.25227076290534, -98.28687812050039, -98.3208002065017, -98.354050590196,
    -98.38664257218008, -98.41858918968131, -98.44990322177266,
    -98.48059719448449, -98.51068338581513, -98.54017383064229,
    -98.56908032553709, -98.59741443348291, -98.62518748850076,
    -98.6524106001829, -98.67909465813703, -98.70525033634212,
    -98.73088809741817, -98.75601819681148, -98.78065068689688,
    -98.80479542099881, -98.82846205733287, -98.85166006286916,
    -98.87439871711919, -98.89668711584784, -98.91853417471181,
    -98.93994863282592, -98.96093905625895, -98.98151384146016,
    -99.00168121861796, -99.0214492549521, -99.04082585794072,
    -99.05981877848335, -99.07843561400145, -99.09668381147746,
    -99.1145706704337, -99.13210334585222, -99.14928885103697,
    -99.16613406041918, -99.18264571230719, -99.19883041158191,
    -99.21469463233888, -99.23024472047788, -99.24548689624156,
    -99.26042725670341, -99.27507177820685, -99.28942631875573,
    -99.30349662035766, -99.31728831132091, -99.33080690850575,
    -99.34405781953129, -99.35704634493862, -99.36977768031112,
    -99.38225691835265, -99.39448905092483, -99.40647897104381,
    -99.41823147483748, -99.42975126346407, -99.44104294499263,
    -99.45211103624632, -99.46295996460924, -99.47359406979736,
    -99.48401760559456, -99.49423474155415, -100,
]

const expectedAnimationKeyframesWithMax = [
    100, 103.96026533864895, 107.84211216953537, 111.64709328315027,
    115.37673072267285, 119.0325163928081, 122.6159126565685,
    126.12835292023883, 129.57124220675774, 132.9459577177456,
    136.25384938440362, 139.4962404075043, 142.67442778668934,
    145.78968283928674, 148.8432517088549, 151.83635586365642,
    154.7701925852618, 157.64593544747805, 160.46473478579378,
    163.22771815752884, 165.93599079287213, 168.59063603698866,
    171.19271578337174, 173.7432708986148, 176.24332163877182,
    178.6938680574733, 181.09589040596114, 183.45034952520206, 185.758187230237,
    188.0203266869196, 190.2376727811947, 192.41111248106512, 194.5415151913903,
    196.62973310166018, 198.6766015268821, 200.6829392417181,
    202.55043663922197, 204.11936980645882, 205.34380950068214,
    206.1985204960506, 206.6781880183153, 206.79577389527952, 206.5801631327034,
    206.07327995383224, 205.32686044160923, 204.39906738532787,
    203.35112274802813, 202.24411564294084, 201.13612036601066,
    200.0797315361748, 199.12009344377734, 198.29346995316678,
    197.62637128182013, 197.13522603835872, 196.82656217116516,
    196.6976398243938, 196.73746310983225, 196.92808679481317,
    197.24612792588968, 197.66439126019057, 198.15352065576033,
    198.6835957020738, 199.225603148031, 199.7527253207682, 200.24140190124916,
    200.67213631405482, 201.03003282505435, 201.3050645239781,
    201.4920851036547, 201.59060825874323, 201.60438727072693,
    201.54083371465163, 201.41031814084934, 201.22539709928927,
    201.00001014219455, 200.7486877106165, 200.48580640224657,
    200.2249223994875, 199.9782072042949, 199.75600268081408, 199.566505135766,
    199.41558112636253, 199.3067111878657, 199.24105197400704,
    199.21760259736936, 199.23345737202072, 199.2841247603341,
    199.36389111104745, 199.46620769096847, 199.58408045476287,
    199.71044382364622, 199.83850228382823, 199.96202668096984,
    200.0755954824591, 200.17477481268355, 200.25623455713608,
    200.31780111780145, 200.35845034852244, 200.3782466977186,
    200.37823656113068, 200.3603052553915, 200.32700785143822,
    200.28138437101842, 200.2267695909565, 200.16660698043964,
    200.1042751942986, 200.04293414876025, 199.9853961096076,
    199.93402552078274, 199.89066958487956, 199.856619958429, 199.8326044160203,
    199.8188060263291, 199.8149063133225, 199.82014807502534, 199.8334130126167,
    199.853309082137, 199.8782625045561, 199.90660963115107, 199.93668432506897,
    199.96689714533042, 199.99580336136796, 200.02215763825401,
    200.04495406989838, 200.0634510576312, 200.07718129749176,
    200.08594782008575, 200.0898075979292, 200.0890446801292,
    200.08413512397715, 200.07570616574156, 200.06449211350034,
    200.05128936389832, 200.0369127576593, 200.02215521447698,
    200.00775224784672, 199.99435257685846, 199.9824956472612,
    199.97259646942322, 199.96493779532244, 199.95966930684668,
    199.95681318665046, 200,
]
