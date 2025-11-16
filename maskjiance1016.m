clc; clear all; close all;

%% 图像预处理
Im = imread("");
Im = imresize(Im, [800 600]);

im = imread(""); % 输入分割之后图像
im = imresize(im, [800 600]);
if size(im, 3) == 3
    im = rgb2gray(im);
end

pointData = struct('x', {}, 'y', {}, 'radius', {});
IM(:, :, 1) = im2double(im);
IM(:, :, 2) = im2double(im);
IM(:, :, 3) = im2double(im);

S = Im;
BW = bwmorph(im, 'thin', inf); % 细化得到骨架

[m, n] = find(BW == 1);
for i = 1:length(m)
    S(m(i), n(i), 1) = 0;
    S(m(i), n(i), 2) = 0; 
    S(m(i), n(i), 3) = 0; % 将骨架设为红色，显示出来
end

% 图1：在掩码上画出提取的中心线结果
figure('NumberTitle', 'off', 'Name', '中心线');
imshow(im);
hold on;
plot(n, m, 'r.', 'MarkerSize', 2); % 在掩码上绘制红色点表示中心线



%% 计算分割后图像的直径
[y_l, x_l] = find(BW == 1);
R_segmented = zeros(1, length(m)); % 初始化分割后直径的数组

for j = 1:length(x_l)
    x0 = round(y_l(j)); % 中心点的 x 坐标
    y0 = x_l(j);       % 中心点的 y 坐标
    r = 110;            % 检索半径，可以根据需要调整
    
    % 使用 MoMforSeg1 函数计算半径
    R_segmented(j) = MoMforSeg1(x0, y0, r, im);
    radius = MoMforSeg1(x0, y0, r, im);
    % 将坐标和计算出的半径保存到结构数组中
    pointData(j).x = x0;
    pointData(j).y = y0;
    pointData(j).radius = radius;
end

%% 标记分段点
segmentationPoints = [];
for i = 1:length(m)
    neighbors = check_neighbors(BW, m(i), n(i));
    if length(neighbors) == 3
        segmentationPoints = [segmentationPoints; [n(i), m(i)]];
    end
end

% 图2：在掩码上画出分段点
figure('NumberTitle', 'off', 'Name', '分段点');
imshow(im);
hold on;
plot(n, m, 'r.', 'MarkerSize', 2); % 在掩码上绘制红色点表示中心线
plot(segmentationPoints(:, 1), segmentationPoints(:, 2), 'mo', 'MarkerFaceColor', 'magenta', 'MarkerSize', 5);
hold off;

%% 对分段点进行处理，移除领域内距离过近的分段点
distMatrix = pdist2(segmentationPoints, segmentationPoints);
keepPoints = true(size(segmentationPoints, 1), 1);
for i = 1:size(segmentationPoints, 1)
    for j = i+1:size(segmentationPoints, 1)
        if distMatrix(i, j) < 8
            keepPoints(j) = false;
        end
    end
end
finalSegmentationPoints = segmentationPoints(keepPoints, :);

%% 自动找到每一段路径并进行狭窄点判断
allStenosisPoints = [];
allStenosisDegrees = [];

for i = 1:(size(finalSegmentationPoints, 1) - 1)
    startPoint = finalSegmentationPoints(i, :);
    endPoint = finalSegmentationPoints(i + 1, :);
    
    try
        [shortestPath, shortestPathLength] = findpath2(BW, startPoint, endPoint);
    catch
        warning('未找到从起点到目标点的路径: (%d, %d) 到 (%d, %d)', startPoint(1), startPoint(2), endPoint(1), endPoint(2));
        continue;
    end
    
    % 计算路径的平均半径
    average_R = 0;
    for k = 1:shortestPathLength
        currentPoint = shortestPath(k, :);
        currentRadius = getRadius(pointData, currentPoint);
        average_R = average_R + currentRadius;
    end
    average_R = average_R / shortestPathLength;
    
    % 计算狭窄点与狭窄程度
    queue = [];
    queue = duilie(1, shortestPath, queue, pointData);
    middlePoints = [];
    xiazhaichengdu = [];
    for i = 2:3:size(queue, 1) - 1
        n = 2 * getRadius(pointData, queue(i, :)) / (getRadius(pointData, queue(i+1, :)) + getRadius(pointData, queue(i-1, :)));
        nn = 1 - n;
        if nn > 0.25 && average_R > 4
            xiazhaichengdu = [xiazhaichengdu; nn];
            middlePoints = [middlePoints; queue(i, :)];
        end
    end
    
    allStenosisPoints = [allStenosisPoints; middlePoints];
    allStenosisDegrees = [allStenosisDegrees; xiazhaichengdu];
end

allStenosisPoints = fliplr(allStenosisPoints);
allStenosisPoints = sortrows(allStenosisPoints);

% 保留需要的狭窄点
keepIndices = true(size(allStenosisPoints, 1), 1);
for i = 1:size(allStenosisPoints, 1) - 1
    if abs(allStenosisPoints(i, 1) - allStenosisPoints(i+1, 1)) < 10
        if allStenosisPoints(i, 1) < allStenosisPoints(i+1, 1)
            keepIndices(i+1) = false;
        else
            keepIndices(i) = false;
        end
    end
end

allStenosisPoints = allStenosisPoints(keepIndices, :);
allStenosisDegrees = allStenosisDegrees(keepIndices);

%% 图3：在掩码上绘制狭窄检测结果
figure('NumberTitle', 'off', 'Name', '狭窄检测结果');
imshow(im);
hold on;

% 为图例添加虚拟点
h_blue = plot(NaN, NaN, 'bo', 'MarkerSize', 12);
h_green = plot(NaN, NaN, 'go', 'MarkerSize', 12);
h_red = plot(NaN, NaN, 'ro', 'MarkerSize', 12);

for i = 1:size(allStenosisPoints, 1)
    stenosisX = allStenosisPoints(i, 1);
    stenosisY = allStenosisPoints(i, 2);
    stenosisDegree = allStenosisDegrees(i);
    
    % 根据狭窄程度选择颜色
    if stenosisDegree > 0.75
        color = 'r'; % 红色
    elseif stenosisDegree > 0.5
        color = 'g'; % 绿色
    else
        color = 'b'; % 蓝色
    end
    
    % 绘制空心圈圈
    plot(stenosisX, stenosisY, 'o', 'MarkerEdgeColor', color, 'MarkerSize', 11,'LineWidth',2);
end

hold off;
xlabel('X Coordinate');
ylabel('Y Coordinate');
